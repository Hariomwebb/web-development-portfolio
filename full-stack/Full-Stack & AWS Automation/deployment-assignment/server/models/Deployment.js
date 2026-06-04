const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    at: { type: Date, default: Date.now },
  },
  { _id: false }
);

const deploymentSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    domain: { type: String, required: true, trim: true, lowercase: true },
    image: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Running", "Completed", "Failed"],
      default: "Pending",
    },
    containerName: { type: String, trim: true },
    jobId: { type: String, trim: true },
    errorMessage: { type: String, trim: true },
    events: [eventSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deployment", deploymentSchema);
