# Hosting Control Panel

Full-stack assignment for automating client onboarding on a hosting platform.

## What It Includes

- React control panel with client onboarding form and live polling dashboard
- Node.js/Express API
- MongoDB persistence for deployment records
- Redis/BullMQ background queue
- Worker process that runs Docker deployment commands on EC2 through AWS SSM
- AWS SDK v3 Lambda invocation for post-deployment setup
- Local `DEPLOYMENT_MODE=mock` so the reviewer can demo the flow without AWS credentials

## Project Structure

```text
deployment-assignment/
  server/
    server.js              Express API
    worker.js              BullMQ deployment worker
    queue.js               Redis/BullMQ connection
    db.js                  MongoDB connection
    models/Deployment.js   Deployment schema
  client/client/           React app
```

## Prerequisites

- Node.js 18+
- MongoDB
- Redis
- Optional: Docker Compose for local MongoDB and Redis
- Optional for real AWS mode: AWS credentials with SSM and Lambda permissions

## Setup

Install backend dependencies from the workspace root:

```bash
npm install
```

Install frontend dependencies:

```bash
cd deployment-assignment/client/client
npm install
```

Create environment config:

```bash
copy .env.example .env
```

For local services:

```bash
docker compose up -d
```

## Run Locally

Terminal 1, API:

```bash
npm run server
```

Terminal 2, worker:

```bash
npm run worker
```

Terminal 3, React:

```bash
cd deployment-assignment/client/client
npm start
```

Open `http://localhost:3000`.

## API

### `POST /api/deploy`

Creates a deployment as `Pending`, stores it in MongoDB, pushes a BullMQ job, and responds immediately.

```json
{
  "clientName": "Acme Cloud",
  "domain": "test.ourplatform.com",
  "image": "nginx:latest"
}
```

Response:

```json
{
  "id": "6655f8d0f4a0a77c1c845f2d",
  "status": "Pending"
}
```

### `GET /api/status/:id`

Returns the current deployment record and event trail.

Statuses: `Pending`, `Running`, `Completed`, `Failed`.

## AWS Mode

Set this in `.env`:

```bash
DEPLOYMENT_MODE=aws
AWS_REGION=ap-south-1
EC2_INSTANCE_ID=i-xxxxxxxxxxxxxxxxx
LAMBDA_FUNCTION_NAME=post-deployment-setup
```

The worker sends shell commands to the EC2 instance with SSM `SendCommandCommand`:

- `docker pull <image>`
- remove any existing container for that deployment
- run the container with labels for host-based routing by domain

Then the worker invokes Lambda with AWS SDK v3 `InvokeCommand`.

## Notes For Review

`DEPLOYMENT_MODE=mock` is the default so the full queue and status lifecycle can be tested without real AWS infrastructure. The code path for `DEPLOYMENT_MODE=aws` uses AWS SSM and Lambda clients directly and will work after valid AWS credentials, EC2 instance ID, and Lambda function name are provided.
