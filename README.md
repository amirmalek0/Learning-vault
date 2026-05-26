# Learning Vault

Personal notes on DevOps, software engineering, and related topics — written as Markdown in this repo and published as a static site with [Docusaurus](https://docusaurus.io/).

**Live site:** [amirmalek0.github.io/Learning-vault](https://amirmalek0.github.io/Learning-vault/)

## Repository layout

```text
Learning Vault/
├── DevOps/                  # DevOps notes
├── Software Engineering/    # SE notes
├── website/                 # Docusaurus app (theme, homepage, build)
└── .github/workflows/       # GitHub Pages deploy
```

## Local preview

```bash
cd website
npm install
npm start
```

Open the URL shown in the terminal (usually `http://localhost:3000`). Markdown changes under `DevOps/`, `Software Engineering/`, etc. hot-reload.

Production build:

```bash
cd website
npm run build
npm run serve   # optional: preview build/
```

## Deployment

Pushes to `master` (or `main`) run [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), which builds the site and deploys to **GitHub Pages**.

You can also trigger a deploy manually: **Actions → Deploy Docusaurus to GitHub Pages → Run workflow**.

**Pages settings:** Repository **Settings → Pages → Build and deployment** should use **GitHub Actions** as the source.
