const crypto = require("crypto");

function encodeDeployment(payload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

module.exports = function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const clientName = String(req.body?.clientName || "").trim();
  const domain = String(req.body?.domain || "").trim().toLowerCase();
  const image = String(req.body?.image || "").trim();

  if (!clientName || !domain || !image) {
    return res.status(400).json({
      error: "clientName, domain, and image are required",
    });
  }

  const id = encodeDeployment({
    token: crypto.randomUUID(),
    clientName,
    domain,
    image,
    createdAt: Date.now(),
  });

  return res.status(200).json({ id, status: "Pending" });
};
