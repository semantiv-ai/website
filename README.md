# Semantiv Website

Static Astro site for `semantiv.ai`.

## Local Development

```sh
npm install
npm run dev
```

## Verification

```sh
npm run check
npm run build
```

## Cloudflare Pages

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`

The repository includes `.node-version` so Cloudflare Pages can select a Node runtime compatible with Astro 6.

This Cloudflare Pages project is currently a Direct Upload project, not Git-integrated.
To deploy manually:

```sh
npm run build
npx wrangler pages deploy dist --project-name semantiv-ai --branch main
```
