import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("public");
const siteOrigin = "https://gungorbasa.com";
const textExtensions = new Set([".html", ".json", ".txt", ".xml"]);

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

const files = await walk(outputDirectory);
const routes = [];

for (const file of files) {
  if (path.basename(file) !== "index.html") continue;

  const relativeDirectory = path.relative(outputDirectory, path.dirname(file));
  if (!relativeDirectory) continue;

  routes.push(`/${relativeDirectory.split(path.sep).join("/")}`);
}

routes.sort((left, right) => right.length - left.length);

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Rewrite each complete route once. Replacing routes in a loop caused nested
// paths to be rewritten repeatedly (for example, /tags/vim/ became /tagsvim).
const routePattern = new RegExp(
  `(${routes.map(escapeRegularExpression).join("|")})/(?=["'\\s<>?#),\\]}]|$)`,
  "g",
);

function normalizePaginatorMetadata(contents, file) {
  if (path.basename(file) !== "index.html") return contents;

  const relativeDirectory = path.relative(outputDirectory, path.dirname(file));
  const route = `/${relativeDirectory.split(path.sep).join("/")}`;
  if (!/\/page\/[2-9]\d*$/.test(route)) return contents;

  const canonicalPattern = /<link rel=canonical href=(?:"([^"]*)"|'([^']*)'|([^\s>]+))>/i;
  const canonicalMatch = contents.match(canonicalPattern);
  if (!canonicalMatch) throw new Error(`Missing canonical URL in ${file}`);

  const previousCanonical = canonicalMatch[1] ?? canonicalMatch[2] ?? canonicalMatch[3];
  const canonical = `${siteOrigin}${route}`;

  contents = contents.replace(canonicalPattern, `<link rel=canonical href=${canonical}>`);
  contents = contents.replace(
    /<meta property="og:url" content=(?:"[^"]*"|'[^']*'|[^\s>]+)>/i,
    `<meta property="og:url" content="${canonical}">`,
  );
  contents = contents.replace(
    /(<script type=application\/ld\+json>)([\s\S]*?)(<\/script>)/gi,
    (_match, openingTag, json, closingTag) =>
      `${openingTag}${json.replaceAll(JSON.stringify(previousCanonical), JSON.stringify(canonical))}${closingTag}`,
  );

  return contents;
}

for (const file of files) {
  if (!textExtensions.has(path.extname(file))) continue;

  let contents = await readFile(file, "utf8");
  const original = contents;

  contents = contents.replace(routePattern, "$1");
  contents = normalizePaginatorMetadata(contents, file);

  if (contents !== original) await writeFile(file, contents);
}
