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

## Search and AI discovery

- On 2026-10-02, the owner reaffirmed that SEO visibility, AI discovery/citations, and recognition are primary goals. Evaluate bot protections against access for legitimate search and answer-fetching crawlers; security recommendation counts alone are not the goal.
- The 2026-10-02 authorized SEO update explicitly allows `Google-Extended` in the source robots template. Cloudflare still prepends a Disallow for that token; Google's documented REP combines repeated same-agent groups and gives equal-specificity Allow precedence. The live file was verified with both rules present and effective root access allowed. This token permits both Gemini training and grounding in Gemini Apps/Vertex AI; those uses cannot be separated by this token. Ordinary Google Search inclusion/ranking is independent. Source content signals explicitly permit search and AI input, reserve general training, and permit Google's combined use in its specific group. GPTBot/ClaudeBot blocks remain separate from search/answer bots.
- Hugo generates `/robots.txt` with a canonical sitemap reference, a Google-Extended exception, and a generic allow-all group. Blog Cloudflare categories read Search = Allow, Agent = Allow, Training = Disallow, Bot Preference Sync = on. RetrievalKit, PlungeLab, and Phomage were separately inspected: all three categories read Allow and Sync is off. Do not extend the blog's training enforcement claim to those zones.
- Cloudflare AI Crawl Control allows Googlebot, BingBot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, and DuckAssistBot. Training crawlers such as GPTBot and ClaudeBot remain blocked separately from their search/citation bots.
- Each page has a canonical URL and JSON-LD; articles expose Article schema with author, publication date, topic, and word count.
- Hugo generates `/llms.txt` from published posts so AI systems receive a concise, automatically updated map of the site, author, archive, articles, sitemap, and feed.
- On 2026-09-07, Search Console alerts reported `noindex`, 404, duplicate-without-canonical, redirect, and robots exclusions. The live audit found no `noindex` directive or Googlebot block on indexable pages and every sitemap URL returned 200, but it did uncover a cascading output rewrite that collapsed nested paths such as `/tags/vim/` into `/tagsvim`. The normalizer now rewrites complete routes in one pass. Homepage pagination was removed because the homepage intentionally shows only six recent items, and `/posts/page/2` now has self-referencing canonical, Open Graph, and schema URLs. Regression checks enforce one valid canonical per generated page, self-canonical and unique sitemap entries, indexability, and robots access. The deployed Worker permanently redirects the 17 malformed taxonomy/RSS URLs, nine generated page-one aliases, and the former duplicate `/page/2` route; intentional HTTPS, apex-domain, and canonical-path redirects remain expected exclusions in Search Console.
- Cloudflare Crawler Hints/IndexNow was still disabled after the audit because enabling it requires accepting Cloudflare supplemental terms.
- As of the initial 2026-08-28 check, public search queries did not yet show `gungorbasa.com` in the index. The `gungorbasa.com` domain property is verified in Google Search Console under `gungorbasa@gmail.com`, and `https://gungorbasa.com/sitemap.xml` was successfully submitted on 2026-08-28. Optionally import the verified property into Bing Webmaster Tools as well.
- A live check of the Medium article `intelligent-agents-dc5901daba7d` showed that Medium still self-canonicalizes to `medium.com/technology-of-me/...`, not to the restored `gungorbasa.com/...` URL. Matching slugs alone do not resolve cross-domain duplication; each retained Medium story should have its canonical setting changed to the corresponding apex-domain URL.

## 2026-10-02 — PageSpeed and crawler-access verification

- Owner authorized fixes across the websites and then deferred VoxDub. No VoxDub source or settings were changed during this SEO/performance work. Phomage has no website, so its CDN-only configuration was reviewed without inventing an apex website or a PageSpeed target.
- Theme overrides are based on Blowfish v3.4.0: `layouts/partials/head.html`, `layouts/partials/header/components/mobile-menu.html`, `assets/js/appearance.js`, and `assets/js/menu-a11y.js`. Review these overrides when upgrading the theme.
- Mobile-menu controls are native buttons backed by the theme's existing checkbox/CSS state. Keyboard activation, Escape, return focus, dark/light appearance, search, and article navigation were verified live. Obsolete empty search/appearance menu entries were removed; the theme's dedicated buttons remain enabled. This fixes the desktop unnamed-link audit as well as the mobile invalid-label-role audit.
- Homepage CSS and the tiny appearance script are inlined to avoid blocking network round trips. Article CSS stays fingerprinted and independently cacheable. Theme-color values are taken from the active scheme at build time instead of a forced layout read after changing classes.
- Final deployment: Worker `gungorbasa-blog`, version `36401b79-32d6-43be-9b7f-95f92336b098`. Hugo/output checks passed for 35 HTML files, 16 canonical sitemap URLs, and 27 permanent redirects. All 16 live sitemap pages passed HTTP/indexability/canonical checks; llms.txt, robots.txt, and security.txt return valid plain text.
- Final PageSpeed report: https://pagespeed.web.dev/analysis/https-gungorbasa-com/cxq1gsofzo?form_factor=mobile . Mobile and desktop score 100 in Performance, Accessibility, Best Practices, and SEO, plus 3/3 Agentic Browsing. Final mobile LCP is 1.146 seconds, TBT 0, CLS 0. Lab scores vary; no field Core Web Vitals dataset was available.
- Cloudflare's sampled last-24-hour security events showed no Bot Fight Mode actions against Verified Bot Category = AI Search on the blog, RetrievalKit, or PlungeLab. Blog's seven-day crawler table showed allowed search/user-agent requests. Bot Fight Mode and AI Labyrinth were retained. Ordinary Python clients can still be challenged; their robots response may contain only Cloudflare's managed section. Successful curl/browser fetches do not prove authenticated access for every real crawler. Keep this limitation separate from verified category settings and sampled-log observations.
- Account-wide work report and public checks are in `docs/seo-performance-2026-10-02.md` and `docs/seo-performance-2026-10-02-live.json`; external repo decisions also live in their own designated memory files.

## Security configuration review

- The 2026-10-02 Cloudflare Security Insights review and authorized remediation are saved in `docs/security-insights-2026-10-02.md`, with before/after public DNS/HTTP/TLS observations in adjacent JSON files. The report includes an account-wide execution record; this project's configuration decisions are recorded here.
- User-authorized dashboard changes enabled zone-wide Always Use HTTPS, minimum TLS 1.2 (TLS 1.3 retained), HSTS for one month (`max-age=2592000`, without includeSubDomains/preload), Bot Fight Mode, AI Labyrinth, and Cloudflare security.txt. Live apex/www and article checks passed; TLS 1.0/1.1 are rejected. HTTP www now redirects to HTTPS www before the existing Worker redirects to the canonical apex, preserving paths and queries.
- Security.txt contact is `mailto:gungor@eggyolk.io`, preferred language `en`, canonical `https://gungorbasa.com/.well-known/security.txt`, expiry `2027-03-31T12:00:00Z`. Renew before expiry.
- Owner confirmed no email or forwarding on this domain. Added root TXT `v=spf1 -all` and `_dmarc` TXT `v=DMARC1; p=reject; sp=reject`; both resolve publicly through 1.1.1.1. Change these policies before introducing legitimate sending, including subdomain senders.
- Owner explicitly requested keeping the five legacy CNAMEs and both GoDaddy MX records. No null MX was added. DNS backup is `docs/gungorbasa-dns-before-security-2026-10-02.txt`. Do not delete retained records without new authorization.
- Older proxied `autodiscover`, `ftp`, and `mail` still return HTTPS 522; `autodiscover.admin.gungorbasa.com` still fails TLS negotiation. HTTPS redirects now work, but origin/certificate problems remain. Keep HSTS includeSubDomains/preload disabled until required subdomains have valid HTTPS.
- Cloudflare account MFA is now active: owner personally completed credential setup, and the dashboard confirms security-key two-factor authentication. Backup-code download completed; no credential or recovery-code contents were read/persisted by the agent. Social-login password setup used Cloudflare’s documented Forgot Password path. The static blog has no authentication/submission form requiring Turnstile.

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
