const express=require("express");
const cors=require("cors");
const {connectDatabase}=require("./db");
const Deployment=require("./models/Deployment");
const {deploymentQueue}=require("./queue");
const config=require("./config");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/api/health",(req,res) => {
  res.json({ok: true});
});

app.post("/api/deploy",async (req,res,next) => {
  try {
    const clientName=String(req.body.clientName||"").trim();
    const domain=String(req.body.domain||"").trim().toLowerCase();
    const image=String(req.body.image||"").trim();

    if(!clientName||!domain||!image) {
      return res.status(400).json({
        error: "clientName, domain, and image are required",
      });
    }

    const deployment=await Deployment.create({
      clientName,
      domain,
      image,
      status: "Pending",
      events: [{message: "Deployment request accepted"}],
    });

    const job=await deploymentQueue.add(
      "deploy-client",
      {deploymentId: deployment.id},
      {
        attempts: 2,
        backoff: {type: "exponential",delay: 3000},
        removeOnComplete: 100,
        removeOnFail: 100,
      }
    );

    deployment.jobId=String(job.id);
    deployment.events.push({message: `Queued background job ${job.id}`});
    await deployment.save();

    res.status(200).json({id: deployment.id,status: deployment.status});
  } catch(error) {
    next(error);
  }
});

app.get("/api/status/:id",async (req,res,next) => {
  try {
    const deployment=await Deployment.findById(req.params.id).lean();

    if(!deployment) {
      return res.status(404).json({error: "Deployment not found"});
    }

    res.json({
      id: deployment._id,
      clientName: deployment.clientName,
      domain: deployment.domain,
      image: deployment.image,
      status: deployment.status,
      jobId: deployment.jobId,
      errorMessage: deployment.errorMessage,
      events: deployment.events||[],
      createdAt: deployment.createdAt,
      updatedAt: deployment.updatedAt,
    });
  } catch(error) {
    next(error);
  }
});

app.use((error,req,res,next) => {
  console.error(error);
  res.status(500).json({error: "Internal server error"});
});

async function start() {
  await connectDatabase();
  app.listen(config.port,() => {
    console.log(`API running on http://localhost:${config.port}`);
  });
}

start().catch((error) => {
  console.error("Unable to start API",error);
  process.exit(1);
});
