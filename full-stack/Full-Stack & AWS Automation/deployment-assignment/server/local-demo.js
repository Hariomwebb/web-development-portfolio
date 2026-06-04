const express = require("express");
const cors = require("cors");
const { randomUUID } = require("crypto");
const config = require("./config");

const app = express();
const deployments = new Map();

app.use(cors());
app.use(express.json());

function addEvent(deployment, message) {
  deployment.events.push({ message, at: new Date().toISOString() });
  deployment.updatedAt = new Date().toISOString();
}

function runDemoWorkflow(id) {
  const deployment = deployments.get(id);
  if (!deployment) return;

  setTimeout(() => {
    const current = deployments.get(id);
    if (!current || current.status !== "Pending") return;

    current.status = "Running";
    current.jobId = `demo-${id.slice(0, 8)}`;
    addEvent(current, "Worker picked up deployment job");

    setTimeout(() => {
      const dockerStep = deployments.get(id);
      if (!dockerStep || dockerStep.status !== "Running") return;

      dockerStep.containerName = `${dockerStep.clientName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 32)}-${id.slice(0, 6)}`;
      addEvent(dockerStep, "Docker container command sent to EC2");

      setTimeout(() => {
        const final = deployments.get(id);
        if (!final || final.status !== "Running") return;

        const shouldFail = /fail|error/i.test(
          `${final.clientName} ${final.domain} ${final.image}`
        );

        final.status = shouldFail ? "Failed" : "Completed";
        final.errorMessage = shouldFail
          ? "Demo failure triggered by input containing fail or error"
          : "";
        addEvent(final, "Post-deployment Lambda invoked");
      }, 1400);
    }, 1800);
  }, 900);
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mode: "local-demo" });
});

app.post("/api/deploy", (req, res) => {
  const clientName = String(req.body.clientName || "").trim();
  const domain = String(req.body.domain || "").trim().toLowerCase();
  const image = String(req.body.image || "").trim();

  if (!clientName || !domain || !image) {
    return res.status(400).json({
      error: "clientName, domain, and image are required",
    });
  }

  const id = randomUUID();
  const now = new Date().toISOString();
  const deployment = {
    id,
    clientName,
    domain,
    image,
    status: "Pending",
    jobId: "",
    errorMessage: "",
    events: [{ message: "Deployment request accepted", at: now }],
    createdAt: now,
    updatedAt: now,
  };

  deployments.set(id, deployment);
  runDemoWorkflow(id);

  res.status(200).json({ id, status: deployment.status });
});

app.get("/api/status/:id", (req, res) => {
  const deployment = deployments.get(req.params.id);

  if (!deployment) {
    return res.status(404).json({ error: "Deployment not found" });
  }

  res.json(deployment);
});

app.listen(config.port, () => {
  console.log(`Local demo API running on http://localhost:${config.port}`);
});
