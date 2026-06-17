require("dotenv").config();

const config = {
  port: Number(process.env.PORT || 5000),
  mongoUri:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hosting-control-panel",
  redisUrl: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  queueName: process.env.QUEUE_NAME || "deployment-queue",
  deploymentMode: process.env.DEPLOYMENT_MODE || "mock",
  awsRegion: process.env.AWS_REGION || "ap-south-1",
  ec2InstanceId: process.env.EC2_INSTANCE_ID || "",
  lambdaFunctionName: process.env.LAMBDA_FUNCTION_NAME || "",
  ssmDocumentName: process.env.SSM_DOCUMENT_NAME || "AWS-RunShellScript",
};

module.exports = config;
