# Hours Tracker

A small local hours tracking app for task budgets, daily spent hours, remaining hours, and over-budget alerts.

## Folder Structure

- index.html - App markup and page structure.
- styles.css - Dashboard, form, table, and responsive styling.
- script.js - Task storage, calculations, rendering, and interactions.
- hours_tracker_v4.html - Compatibility redirect to index.html for old links.

## Run Locally

Open index.html directly in a browser, or serve the folder with a local server:

`ash
python -m http.server 4173
`

Then visit http://127.0.0.1:4173/index.html.

## Storage

The app stores data in window.storage when available and keeps the same storage key: hours_tracker_v4.
