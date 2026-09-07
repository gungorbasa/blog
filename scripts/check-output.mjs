import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { permanentRedirects } from "../worker.js";

const outputDirectory = path.resolve("public");
const siteOrigin = "https://gungorbasa.com";

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(entryPath)));
    else files.push(entryPath);
  }

  return files;
}

function outputPathForUrl(url) {
  let pathname = decodeURIComponent(url.pathname);
  if (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
  if (!pathname) return path.join(outputDirectory, "index.html");
  if (path.extname(pathname)) return path.join(outputDirectory, pathname);
  return path.join(outputDirectory, pathname, "index.html");
}

async function assertPublished(url, source) {
  if (url.origin !== siteOrigin) return;

  try {
    await access(outputPathForUrl(url));
  } catch {
    throw new Error(`${source} points to missing output: ${url.href}`);
  }
}

function routeUrlForFile(file) {
  const relativePath = path.relative(outputDirectory, file).split(path.sep).join("/");
  if (relativePath === "index.html") return new URL(siteOrigin);
  if (relativePath.endsWith("/index.html")) {
    return new URL(`/${relativePath.slice(0, -"/index.html".length)}`, siteOrigin);
  }
  return new URL(`/${relativePath}`, siteOrigin);
}

function canonicalUrls(contents) {
  return [
    ...contents.matchAll(/<link\s+rel=(?:"canonical"|'canonical'|canonical)\s+href=(?:"([^"]+)"|'([^']+)'|([^\s>]+))/gi),
  ].map((match) => new URL(match[1] ?? match[2] ?? match[3], siteOrigin));
}

const files = await walk(outputDirectory);
const htmlFiles = files.filter((file) => path.extname(file) === ".html");
const canonicalByRoute = new Map();

for (const file of htmlFiles) {
  const contents = await readFile(file, "utf8");
  const routeUrl = routeUrlForFile(file);
  const canonicals = canonicalUrls(contents);

  if (canonicals.length !== 1) {
    throw new Error(`${path.relative(outputDirectory, file)} has ${canonicals.length} canonical URLs; expected 1`);
  }

  const [canonical] = canonicals;
  canonicalByRoute.set(routeUrl.pathname, canonical);
  await assertPublished(canonical, path.relative(outputDirectory, file));

  const redirectDestination = permanentRedirects.get(routeUrl.pathname);
  if (redirectDestination) {
    if (canonical.pathname !== redirectDestination) {
      throw new Error(`${routeUrl.pathname} should canonicalize to ${redirectDestination}, not ${canonical.pathname}`);
    }
  } else if (canonical.href !== routeUrl.href) {
    throw new Error(`${routeUrl.pathname} is not self-canonical: ${canonical.href}`);
  }

  if (routeUrl.pathname !== "/404.html" && !redirectDestination && /(?:noindex|none)/i.test(
    [...contents.matchAll(/<meta\s+[^>]*(?:name=(?:"robots"|'robots'|robots|"googlebot"|'googlebot'|googlebot)|content=(?:"[^"]*(?:noindex|none)[^"]*"|'[^']*(?:noindex|none)[^']*'))[^>]*>/gi)]
      .map((match) => match[0])
      .join(" "),
  )) {
    throw new Error(`${routeUrl.pathname} unexpectedly contains a noindex directive`);
  }
}

const sitemap = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
const uniqueSitemapUrls = new Set(sitemapUrls.map((url) => url.href));

if (uniqueSitemapUrls.size !== sitemapUrls.length) {
  throw new Error("sitemap.xml contains duplicate URLs");
}

for (const url of sitemapUrls) {
  await assertPublished(url, "sitemap.xml");
  const canonical = canonicalByRoute.get(url.pathname);
  if (!canonical || canonical.href !== url.href) {
    throw new Error(`Sitemap URL is not self-canonical: ${url.href}`);
  }
  if (permanentRedirects.has(url.pathname)) {
    throw new Error(`Sitemap URL redirects: ${url.href}`);
  }
}

const robots = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
if (!/^User-agent: \*\nAllow: \/$/m.test(robots)) {
  throw new Error("robots.txt does not explicitly allow general crawlers");
}
if (!robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`)) {
  throw new Error("robots.txt does not advertise the canonical sitemap");
}

for (const [source, destination] of permanentRedirects) {
  const response = await (await import("../worker.js")).default.fetch(
    new Request(`${siteOrigin}${source}?redirect-check=1`),
    { ASSETS: { fetch: () => new Response("unexpected asset request") } },
  );

  if (response.status !== 301 || response.headers.get("location") !== `${siteOrigin}${destination}?redirect-check=1`) {
    throw new Error(`Legacy redirect failed: ${source} -> ${destination}`);
  }

  await assertPublished(new URL(destination, siteOrigin), "legacy redirects");
}

console.log(
  `Validated ${htmlFiles.length} HTML files, ${sitemapUrls.length} unique self-canonical sitemap URLs, robots.txt, and ${permanentRedirects.size} permanent redirects.`,
);
