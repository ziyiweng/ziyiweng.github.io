# ziyiweng.github.io

Personal site. The CV lives at **https://ziyiweng.github.io/CV/**.

## Updating the CV

1. Edit `cv-src/cv.tex` (on github.com, or locally and `git push`).
2. GitHub Actions compiles it and redeploys the site, usually within 2–3 minutes.
3. The page shows the PDF inline with a download button and a "last updated" date.

Build locally (optional): `cd cv-src && latexmk -pdf cv.tex`

## One-time setup

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Layout

```
index.html                  homepage
CV/index.html               CV page (embeds the PDF)
cv-src/cv.tex               CV source (LaTeX)
.github/workflows/deploy.yml  compile + deploy
```
