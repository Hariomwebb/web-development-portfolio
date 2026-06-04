# Hosting Control Panel

This is a full-stack project for client deployment automation.

The app lets an admin submit a client name, domain, and Docker image. After submission, the UI shows the deployment status and keeps checking the API until the deployment is completed or failed.

## What This Project Does

- Shows a React admin dashboard
- Accepts client deployment details
- Sends deployment data to a Node.js API
- Tracks deployment status
- Shows deployment events in the UI
- Supports a simple local demo mode without MongoDB, Redis, or AWS
- Also includes full backend code for MongoDB, Redis/BullMQ, AWS SSM, and AWS Lambda

## Tech Used

- React.js
- Node.js
- Express.js
- MongoDB
- Redis
- BullMQ
- Docker Compose
- AWS SDK
- AWS SSM
- AWS Lambda
- Vercel serverless API demo routes

## Folder Structure

```text
full-stack/
  Full-Stack & AWS Automation/
    api/                         Vercel demo API routes
    deployment-assignment/
      client/client/             React frontend
      server/                    Express backend and worker
    docker-compose.yml           MongoDB and Redis services
    package.json                 Backend scripts
    vercel.json                  Vercel build config
```

## Run The Project Locally

Open a terminal in this folder:

```powershell
cd "full-stack\Full-Stack & AWS Automation"
```

Install backend dependencies:

```powershell
npm install
```

Install frontend dependencies:

```powershell
cd "deployment-assignment\client\client"
npm install
cd "..\..\.."
```

### 1. Start The Demo API

This runs the backend in local demo mode. It does not need MongoDB, Redis, or AWS.

```powershell
npm run demo
```

The API will run here:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

### 2. Start The React Frontend

Open a second terminal:

```powershell
cd "full-stack\Full-Stack & AWS Automation\deployment-assignment\client\client"
npm start
```

The frontend will run here:

```text
http://localhost:3000
```

## Full Backend Mode

The project also has a full backend flow with MongoDB, Redis, BullMQ, AWS SSM, and AWS Lambda.

Start MongoDB and Redis:

```powershell
docker compose up -d
```

Start the API:

```powershell
npm run server
```

Start the worker:

```powershell
npm run worker
```

For real AWS deployment, add AWS values in an `.env` file:

```text
DEPLOYMENT_MODE=aws
AWS_REGION=ap-south-1
EC2_INSTANCE_ID=your-ec2-instance-id
LAMBDA_FUNCTION_NAME=your-lambda-function-name
```

## API Routes

Create a deployment:

```http
POST /api/deploy
```

Request body:

```json
{
  "clientName": "Acme Cloud",
  "domain": "test.ourplatform.com",
  "image": "nginx:latest"
}
```

Check deployment status:

```http
GET /api/status/:id
```

## Notes

- Use demo mode first for easy testing.
- Demo mode gives fake deployment progress for local testing.
- Full backend mode needs MongoDB and Redis.
- AWS mode needs valid AWS credentials and AWS resource IDs.
