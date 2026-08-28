import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("public");
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

for (const file of files) {
  if (!textExtensions.has(path.extname(file))) continue;

  let contents = await readFile(file, "utf8");
  const original = contents;

  for (const route of routes) {
    contents = contents.replaceAll(`https://gungorbasa.com${route}/`, `https://gungorbasa.com${route}`);
    contents = contents.replaceAll(`href=${route}/`, `href=${route}`);
    contents = contents.replaceAll(`href="${route}/`, `href="${route}`);
    contents = contents.replaceAll(`href='${route}/`, `href='${route}`);
    contents = contents.replaceAll(`"${route}/"`, `"${route}"`);
  }

  if (contents !== original) await writeFile(file, contents);
}
