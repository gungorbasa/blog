# gungorbasa.com

The source for Gungor Basa's technical blog, built with [Hugo](https://gohugo.io/) and the [Blowfish](https://blowfish.page/) theme.

The site contains 13 articles migrated from Medium, with 28 images stored locally. Original custom-domain article paths are preserved so existing links and search rankings can recover when `gungorbasa.com` is connected.

## Local development

```sh
npm install
npm run dev
```

The local site runs at `http://localhost:1313`.

## Production build

```sh
npm run build
```

The generated static site is written to `public/`.

## Deploy to Cloudflare

```sh
npm run deploy
```

Use `gungorbasa.com` as the canonical custom domain. Redirect `www.gungorbasa.com` permanently to `https://gungorbasa.com`.

## Content rights

Article content and original images are © Gungor Basa. All rights reserved.
