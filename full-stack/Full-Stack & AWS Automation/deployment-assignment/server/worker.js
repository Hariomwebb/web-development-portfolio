const { Worker } = require("bullmq");
const {
  LambdaClient,
  InvokeCommand,
  LogType,
} = require("@aws-sdk/client-lambda");
const { SSMClient, SendCommandCommand } = require("@aws-sdk/client-ssm");
const config = require("./config");
const { connectDatabase } = require("./db");
const Deployment = require("./models/Deployment");
const { connection } = require("./queue");

const lambdaClient = new LambdaClient({ region: config.awsRegion });
const ssmClient = new SSMClient({ region: config.awsRegion });

function sanitizeContainerName(clientName, deploymentId) {
  const normalized = clientName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);

  return `${normalized || "client"}-${deploymentId.slice(-6)}`;
}

async function appendEvent(deploymentId, message, fields = {}) {
  await Deployment.findByIdAndUpdate(deploymentId, {
    ...fields,
    $push: { events: { message } },
  });
}

function buildDockerCommands(deployment) {
  const containerName = sanitizeContainerName(
    deployment.clientName,
    deployment.id
  );

  return {
    containerName,
    commands: [
      `docker pull ${deployment.image}`,
      `docker rm -f ${containerName} || true`,
      [
        "docker run -d",
        `--name ${containerName}`,
        "--restart unless-stopped",
        `-l traefik.enable=true`,
        `-l 'traefik.http.routers.${containerName}.rule=Host(\`${deployment.domain}\`)'`,
        `-l traefik.http.services.${containerName}.loadbalancer.server.port=80`,
        deployment.image,
      ].join(" "),
    ],
  };
}

async function runDockerOnEc2(deployment) {
  const { containerName, commands } = buildDockerCommands(deployment);

  if (config.deploymentMode === "mock") {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return {
      containerName,
      commandId: "mock-ssm-command",
      commands,
    };
  }

  if (!config.ec2InstanceId) {
    throw new Error("EC2_INSTANCE_ID is required when DEPLOYMENT_MODE=aws");
  }

  const command = new SendCommandCommand({
    InstanceIds: [config.ec2InstanceId],
    DocumentName: config.ssmDocumentName,
    Parameters: {
      commands,
    },
    Comment: `Deploy ${deployment.image} for ${deployment.domain}`,
  });

  const response = await ssmClient.send(command);

  return {
    containerName,
    commandId: response.Command?.CommandId,
    commands,
  };
}

async function invokeLambda(deployment, dockerResult) {
  const payload = {
    deploymentId: deployment.id,
    clientName: deployment.clientName,
    domain: deployment.domain,
    image: deployment.image,
    containerName: dockerResult.containerName,
    ssmCommandId: dockerResult.commandId,
  };

  if (config.deploymentMode === "mock") {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return { statusCode: 200, functionError: undefined };
  }

  if (!config.lambdaFunctionName) {
    throw new Error(
      "LAMBDA_FUNCTION_NAME is required when DEPLOYMENT_MODE=aws"
    );
  }

  const command = new InvokeCommand({
    FunctionName: config.lambdaFunctionName,
    InvocationType: "RequestResponse",
    LogType: LogType.Tail,
    Payload: Buffer.from(JSON.stringify(payload)),
  });

  const response = await lambdaClient.send(command);

  if (response.FunctionError) {
    throw new Error(`Lambda failed: ${response.FunctionError}`);
  }

  return response;
}

async function processDeployment(job) {
  const deployment = await Deployment.findById(job.data.deploymentId);

  if (!deployment) {
    throw new Error(`Deployment ${job.data.deploymentId} not found`);
  }

  await appendEvent(deployment.id, "Worker picked up deployment job", {
    status: "Running",
  });

  try {
    const dockerResult = await runDockerOnEc2(deployment);
    await appendEvent(deployment.id, "Docker container command sent to EC2", {
      containerName: dockerResult.containerName,
    });

    await invokeLambda(deployment, dockerResult);
    await appendEvent(deployment.id, "Post-deployment Lambda invoked", {
      status: "Completed",
      errorMessage: "",
    });
  } catch (error) {
    await appendEvent(deployment.id, error.message, {
      status: "Failed",
      errorMessage: error.message,
    });
    throw error;
  }
}

async function startWorker() {
  await connectDatabase();

  const worker = new Worker(config.queueName, processDeployment, {
    connection,
    concurrency: 3,
  });

  worker.on("completed", (job) => {
    console.log(`Deployment job ${job.id} completed`);
  });

  worker.on("failed", (job, error) => {
    console.error(`Deployment job ${job?.id} failed`, error.message);
  });

  console.log(`Worker listening on queue "${config.queueName}"`);
}

startWorker().catch((error) => {
  console.error("Unable to start worker", error);
  process.exit(1);
});
