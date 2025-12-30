# Knowledge Chart Mockup

## Overview
Angular-based mockup for route and driver performance dashboard.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd Knowledge-Charts
   ```
2. Install Angular CLI:
   ```bash
   npm install -g @angular/cli
   ```
3. Initialize Angular project:
   ```bash
   ng new . --force
   ```
4. Install dependencies:
   ```bash
   ng add @angular/material
   npm install ngx-charts
   ```

## Hosting Instructions
### StackBlitz
- Go to [StackBlitz](https://stackblitz.com).
- Click **Import Project from GitHub**.
- Paste your repo URL.
- The app will run instantly in the browser.

### Netlify
- Connect your GitHub repo in Netlify.
- Build command:
  ```bash
  ng build --configuration production
  ```
- Publish directory:
  ```
  dist/<your-project-name>
  ```

### Vercel
- Connect GitHub repo in Vercel.
- Framework: Angular.
- Build command:
  ```bash
  ng build --configuration production
  ```
- Output directory:
  ```
  dist/<your-project-name>
  ```
