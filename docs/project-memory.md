# Project Memory

## Blog identity

- Primary owned domain: `gungorbasa.com`.
- Medium profile: `https://medium.com/@gbasa`.
- Medium publication: `https://medium.com/technology-of-me` (Technology of Me).
- The Medium publication contains technical posts about iOS, Swift concurrency, AI, and related topics.

## Domain and SEO recovery state

- On 2026-08-28, `gungorbasa.com` and `www.gungorbasa.com` did not serve HTTP/HTTPS successfully.
- The domain is registered at GoDaddy. On 2026-08-28, its authoritative nameservers were changed from GoDaddy to Cloudflare (`keanu.ns.cloudflare.com`, `lucy.ns.cloudflare.com`). The new delegation resolves publicly.
- Before migration, the apex domain used Medium's legacy set of twelve AWS A records (`52.x.x.x`) and later Medium's `162.159.153.4` and `162.159.152.4` addresses.
- The publication currently serves on `medium.com`, indicating the custom domain needs to be reattached/verified in Medium in addition to updating DNS. Medium currently requires an active membership for custom domains.
- Preserve the existing Medium-style paths, including the hexadecimal post suffixes, during any migration. External citations and backlinks still point to paths such as `/intelligent-agents-dc5901daba7d`.
- The user chose to leave Medium custom-domain hosting and use an owned static site.

## Current implementation

- On 2026-08-28, the user selected Hugo with the Blowfish theme for the next implementation after reviewing several technical-blog options.
- The Hugo implementation is the only retained site and lives at the repository root.
- The public source repository is `https://github.com/gungorbasa/blog`.
- Blowfish is installed as a Hugo Module using the `github.com/nunocoracao/blowfish/v3` module path.
- The Hugo site uses Blowfish's restrained page homepage, GitHub colour scheme, automatic dark mode, search, article tables of contents, line-numbered syntax highlighting, and code-copy controls.
- Hosting uses Cloudflare Workers Static Assets; `wrangler.jsonc` drops trailing slashes and serves the generated `404.html`.
- The Cloudflare Worker is named `gungorbasa-blog` and its temporary deployment is available at `https://gungorbasa-blog.gungor.workers.dev`.
- `gungorbasa.com` is configured as the Worker custom domain. The imported proxied `www` CNAME uses a Worker route, and the Worker permanently redirects `www` requests to the matching apex-domain URL while preserving paths and query strings.
- The Hugo production build post-processes internal page URLs and canonical metadata so the established non-trailing-slash Medium custom-domain paths remain canonical.
- The initial export contained 24 post-like entries: 13 published articles were imported, while 8 drafts and 3 short responses were intentionally excluded.
- Imported article images are stored locally under `static/images/posts/`; the initial import downloaded 28 images.
- Hugo article pages live at the original root-level Medium custom-domain slugs, preserving paths such as `/intelligent-agents-dc5901daba7d`.
- The apex domain is canonical. `www.gungorbasa.com` should permanently redirect to `https://gungorbasa.com` when Cloudflare is connected.
- The Worker deployment and custom-domain activation were completed on 2026-08-28. HTTPS is live, HTTP redirects to HTTPS, `www` redirects to the apex while preserving the request path and query, and all 13 migrated article URLs return HTTP 200.

## Visual direction

- The initial large editorial design was rejected by the user as too visually aggressive.
- The current Hugo design uses Blowfish's profile homepage: concise developer introduction, social icons, a short professional summary, and six recent articles. Article pages retain the content-first technical layout.
- Keep future design changes simple and content-first; avoid oversized display typography and magazine-style hero treatments.

## Public profile links and bio

- GitHub: `https://github.com/gungorbasa`.
- X: `https://x.com/gbasa`.
- LinkedIn: `https://www.linkedin.com/in/gungorbasa`.
- Medium: `https://medium.com/@gbasa`.
- Public LinkedIn details used in the site copy: more than ten years of software development experience, a focus on iOS/mobile application development, and an MSc in Computer Science from Oregon State University.
