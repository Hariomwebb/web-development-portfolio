# Hosting Control Panel — Frontend

React UI for the hosting control panel assignment. Built with [Create React App](https://github.com/facebook/create-react-app).

## Prerequisites

The Express backend must be running first:

```bash
# From workspace root
npm start
```

Backend URL: **http://localhost:5000**

## Run locally

```bash
npm install
npm start
```

Open **http://localhost:3000**.

## What this app does

| UI element | Behavior |
|------------|----------|
| Client Name | Text input, required |
| Domain | Text input, required |
| Docker Image | Text input, required |
| Deploy | `POST` form data to `/api/deploy` |
| Status card | Shown after deploy; displays ID and current status |

After deploy:

1. Receives deployment `id` from the API.
2. Sets status to `Pending`.
3. Polls `GET /api/status/:id` immediately, then every **2 seconds** via `setInterval`.
4. Stops polling when status is `Completed` or `Failed`.

## Key files

- `src/App.js` — form, deploy handler, status polling (`useEffect` + `setInterval`)
- `src/App.css` — layout and status styling (Pending / Completed / Failed chips)

## API calls

**Start deployment:**

```http
POST http://localhost:5000/api/deploy
Content-Type: application/json

{
  "clientName": "...",
  "domain": "...",
  "image": "..."
}
```

**Poll status:**

```http
GET http://localhost:5000/api/status/:id
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server (port 3000) |
| `npm test` | Run tests (CRA default) |
| `npm run build` | Production build to `build/` |

## Troubleshooting

- **Network error on deploy** — Start the backend (`npm start` from workspace root).
- **Status stuck on Pending** — Confirm backend logs show deployment steps; full cycle takes ~5 seconds.
- **CORS issues** — Backend enables CORS for local development; keep frontend on port 3000 and API on 5000.
