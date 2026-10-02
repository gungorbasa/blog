# Search visibility and PageSpeed fixes — 2026-10-02

The owner authorized SEO/AI-discovery and PageSpeed fixes across the websites,
then explicitly deferred VoxDub. Source fixes are deployed on the blog,
RetrievalKit, and PlungeLab. Phomage has no apex website; its search/agent bot
policies already allow access, so no website was created. No VoxDub code or
settings changed in this work.

## Final measured results

Scores below are homepage Lighthouse lab results from PageSpeed Insights
13.5.0. Accessibility, Best Practices, and SEO are 100 in every row. All final
reports pass 3/3 Agentic Browsing checks. No site had enough field data to
establish real-user Core Web Vitals.

| Website | Mobile performance | Desktop performance | Mobile LCP | Mobile TBT | Mobile CLS |
| --- | ---: | ---: | ---: | ---: | ---: |
| [gungorbasa.com report](https://pagespeed.web.dev/analysis/https-gungorbasa-com/cxq1gsofzo?form_factor=mobile) | 100 | 100 | 1.146 s | 0 ms | 0 |
| [retrievalkit.com report](https://pagespeed.web.dev/analysis/https-retrievalkit-com/ulr4aejarj?form_factor=mobile) | 96 | 100 | 2.460 s | 0 ms | 0 |
| [plungelab.app report](https://pagespeed.web.dev/analysis/https-plungelab-app/kt02e4s1z5?form_factor=mobile) | 100 | 100 | 1.051 s | 0 ms | 0 |

RetrievalKit's first mobile baseline was 94 with 2.6-second LCP. The blog's
mobile baseline scored 100 but failed one agent accessibility check. Its first
desktop post-change check exposed a separate existing unnamed-link defect
(95 Accessibility, 2/3 Agentic Browsing), which was subsequently fixed.
PlungeLab initially scored 100 with oversized screenshot-image warnings.

PageSpeed temporarily failed to retrieve two desktop reports; a fresh report
resolved the service failure. One PlungeLab run scored 97 with transient long
layout/paint tasks; the final report returned 100 without further code changes.
These observations demonstrate lab variability, not guaranteed future scores.

## Changes and deployments

- **Blog:** native mobile-menu buttons; removal of obsolete blank menu links;
  homepage-only CSS inlining; inline appearance initialization; compile-time
  theme-color values avoiding a forced style read. Theme appearance, menu
  keyboard activation/Escape/focus return, search results, and an article were
  checked live. Worker `gungorbasa-blog`, version
  `36401b79-32d6-43be-9b7f-95f92336b098`.
- **RetrievalKit:** preload Instrument Sans used by the first-screen headline.
  Preserve demand loading of its monospace font and route-owned styles.
  Worker `retrievalkit-next`, version
  `df9fd6a0-4c2a-4464-b131-1b38755c2d3d`.
- **PlungeLab:** screenshot width candidates and sizes now match actual mobile
  display widths. Compress the decorative landscape at WebP quality 65 rather
  than 80; the 1200-pixel variant is 24,814 bytes versus 35,074 bytes (29.3%
  smaller). Live appearance was checked. The final mobile image-delivery
  warning is gone. Worker `plungelab-website`, version
  `60f80a94-b9a2-41ef-8c8f-444b76451b91`.

Each website explicitly allows Google-Extended and AI input in its robots file.
Google's token controls both Gemini grounding and training; ordinary Google
Search is separate. On the blog, the source Allow overrides Cloudflare's
equally specific Disallow because Google combines same-agent groups and gives
Allow precedence for ties. See [Google's REP interpretation](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec)
and [Google-Extended documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers#google-extended).
General content signals reserve training while explicitly permitting search
and AI input; the Google-specific signal permits its combined use. Robots and
content signals are declarations rather than authentication or guaranteed
citation mechanisms.

## Cloudflare access review

| Zone | Search policy | Agent policy | Training policy | Bot Preference Sync |
| --- | --- | --- | --- | --- |
| gungorbasa.com | Allow | Allow | Disallow | On |
| retrievalkit.com | Allow | Allow | Allow | Off |
| plungelab.app | Allow | Allow | Allow | Off |
| phomage.app | Allow | Allow | Allow | Off |

No dashboard settings were changed in this pass. Bot Fight Mode and AI
Labyrinth remain as configured in the earlier security work. For the three
website zones, Security Events filtered to Service = Bot Fight Mode and
Verified Bot Category = AI Search showed no matching firewall events over the
last 24 hours. The blog's seven-day AI table also showed allowed Googlebot,
ChatGPT-User, Claude-User, PerplexityBot, Claude-SearchBot, BingBot, Applebot,
DuckAssistBot, and Mistral-User requests. Its free-table user-agent counts do
not independently verify crawler identity.

The event sample is time-limited; successful browser/curl requests are not
proof that all future crawlers succeed. A normal Python-urllib client received
only Cloudflare's managed robots section and challenge-style cache headers.
Crawler settings, source REP permission, ordinary-client availability, and
sampled security actions are therefore recorded as separate evidence.

## Validation and remaining advisories

- Blog output checks passed: 35 HTML files, 16 self-canonical sitemap URLs,
  robots, and 27 permanent redirects.
- RetrievalKit frozen-lockfile install, lint (zero errors; 755 existing
  warnings), all 31 tests, static export, Wrangler dry run, public crawl audit,
  and production/source drift check passed for all 16 routes.
- PlungeLab Astro Check passed without errors/warnings/hints. Its SEO gate
  passed for 14 pages, metadata/schema/sitemap/links/image dimensions/crawler
  access/preview headers/llms.txt; no client JavaScript was introduced.
- Final public checks passed for all **46** sitemap URLs: HTTP 200, exactly
  one self-canonical URL, and no noindex. Each site's robots, llms.txt, and
  security.txt return the expected text response. Public bodies and observations
  are saved in `seo-performance-2026-10-02-live.json`.

RetrievalKit still reports an approximately 600-ms CSS/font waterfall,
11-KiB legacy-JS, 57-KiB unused-JS, and an unattributed reflow insight. These
include framework/browser-compatibility and multipage caching tradeoffs.
Next's current experimental inlineCss applies globally and duplicates styles
in HTML/RSC; it cannot target only the homepage, so it was not enabled merely
to clear the insight. PlungeLab's independently cached stylesheet has an
approximately 110-ms render-blocking estimate. All site LCP values remain
within the 2.5-second lab target. These remaining performance advisories are
not claimed as eliminated.

Lighthouse's unscored security/manual-review prompts remain distinct from its
passing categories. Strict CSP/Trusted Types and origin-isolation rollouts
need compatibility checks against theme/search/framework scripts. Existing
short HSTS on the blog must not be expanded to includeSubDomains/preload while
the owner-retained legacy subdomains have broken origins/TLS. This work does
not claim every manual recommendation is resolved.

Indexing, rankings, AI citations, audience growth, and the previously recorded
Medium cross-domain canonical issue remain separate from these technical
checks. No fabricated claims, ratings, recommendation instructions, or
unsupported llms.txt ranking promises were added.
