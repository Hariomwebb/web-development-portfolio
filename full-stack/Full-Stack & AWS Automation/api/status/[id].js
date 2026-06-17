function decodeDeployment(id) {
  return JSON.parse(Buffer.from(id, "base64url").toString("utf8"));
}

function event(message, createdAt, offsetMs) {
  return {
    message,
    at: new Date(createdAt + offsetMs).toISOString(),
  };
}

module.exports = function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const deployment = decodeDeployment(req.query.id);
    const elapsed = Date.now() - deployment.createdAt;
    const shouldFail = /fail|error/i.test(
      `${deployment.clientName} ${deployment.domain} ${deployment.image}`
    );

    let status = "Pending";
    if (elapsed >= 1200) status = "Running";
    if (elapsed >= 5200) status = shouldFail ? "Failed" : "Completed";

    const events = [event("Deployment request accepted", deployment.createdAt, 0)];

    if (elapsed >= 1200) {
      events.push(event("Worker picked up deployment job", deployment.createdAt, 1200));
    }

    if (elapsed >= 3200) {
      events.push(
        event("Docker container command sent to EC2", deployment.createdAt, 3200)
      );
    }

    if (elapsed >= 5200) {
      events.push(event("Post-deployment Lambda invoked", deployment.createdAt, 5200));
    }

    return res.status(200).json({
      id: req.query.id,
      clientName: deployment.clientName,
      domain: deployment.domain,
      image: deployment.image,
      status,
      jobId: `vercel-${deployment.token.slice(0, 8)}`,
      errorMessage:
        status === "Failed"
          ? "Demo failure triggered by input containing fail or error"
          : "",
      events,
      createdAt: new Date(deployment.createdAt).toISOString(),
      updatedAt: new Date().toISOString(),
      containerName: `${deployment.clientName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 32)}-${deployment.token.slice(0, 6)}`,
    });
  } catch (error) {
    return res.status(404).json({ error: "Deployment not found" });
  }
};
