# TIBO / RADAR

An independent, live monitor for tracked Codex resets, banked reset credits, and related timeline signals. It reads directly from `https://codex-reset.com/api/timeline` in the browser and refreshes every 60 seconds.

## Run locally

This is a dependency-free static site. From this folder:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy with Vercel + GitHub

1. Commit and push the `tibo-radar` directory to GitHub.
2. In Vercel, choose **Add New → Project**, import this GitHub repository, and set **Root Directory** to `tibo-radar`.
3. Leave the build command empty and deploy. Vercel detects the static `index.html` automatically.

After that, each push to the production branch deploys automatically. Pull requests receive preview deployments. `vercel.json` contains the production headers, including permission for the browser to read the radar API.

## Data behavior

- The live API is the source of truth; the screen labels the connection state.
- If the API is unavailable, a small verified cached record keeps the display useful until the next refresh succeeds.
- Green denotes verified hard resets; blue denotes banked reset credits; amber denotes context or forecast signals.

This project is independent and is not affiliated with OpenAI.
