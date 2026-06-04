# Hosting Control Panel Frontend

This is the React frontend for the Hosting Control Panel project.

It provides an admin form to submit deployment details and a live status panel that polls the backend API.

## What It Uses

- React.js
- Create React App
- CSS
- Fetch API

## Main Files

```text
src/App.js       Main form, deploy request, and status polling
src/App.css      Dashboard layout and status styles
src/index.js     React app entry point
```

## Run The Frontend

Start the backend first from the main project folder:

```powershell
cd "full-stack\Full-Stack & AWS Automation"
npm run demo
```

Then open a second terminal and start the frontend:

```powershell
cd "full-stack\Full-Stack & AWS Automation\deployment-assignment\client\client"
npm start
```

Open:

```text
http://localhost:3000
```

## Git Bash Commands

```bash
cd "/c/Users/hario/Documents/GitHub/web-development-portfolio/full-stack/Full-Stack & AWS Automation/deployment-assignment/client/client"
npm start
```

## API Used By The Frontend

Create deployment:

```http
POST http://localhost:5000/api/deploy
```

Check deployment status:

```http
GET http://localhost:5000/api/status/:id
```

## Available Scripts

```text
npm start       Run the development server
npm run build   Create a production build
npm test        Run tests
```
