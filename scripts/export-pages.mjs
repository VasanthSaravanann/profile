import { access, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const clientDir = path.join(projectRoot, "dist/client");
const serverEntryCandidates = [
  path.join(projectRoot, "dist/server/server.js"),
  path.join(projectRoot, "dist/server/index.mjs"),
];
const pagesBase = "/profile";

async function walkFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(entryPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function prefixPagesUrls(content) {
  return content
    .replaceAll('"/assets/', `"${pagesBase}/assets/`)
    .replaceAll("'/assets/", `'${pagesBase}/assets/`)
    .replaceAll('"/_build/', `"${pagesBase}/_build/`)
    .replaceAll("'/_build/", `'${pagesBase}/_build/`)
    .replaceAll('"/_serverFn/', `"${pagesBase}/_serverFn/`)
    .replaceAll("'/_serverFn/", `'${pagesBase}/_serverFn/`);
}

async function main() {
  let serverEntryPath;
  for (const candidate of serverEntryCandidates) {
    try {
      await access(candidate);
      serverEntryPath = candidate;
      break;
    } catch {
      // Try the next output shape.
    }
  }

  if (!serverEntryPath) {
    throw new Error(`Could not find a built server entry in ${serverEntryCandidates.join(", ")}`);
  }

  const serverModule = await import(pathToFileURL(serverEntryPath).href);
  const server = serverModule.default ?? serverModule;
  let request = new Request("http://localhost/");
  let response;

  for (let redirectCount = 0; redirectCount < 5; redirectCount += 1) {
    response = await server.fetch(request, {}, {
      waitUntil: () => {},
    });

    if (response.status < 300 || response.status >= 400) {
      break;
    }

    const location = response.headers.get("location");
    if (!location) {
      break;
    }

    request = new Request(new URL(location, request.url));
  }

  if (!response || !response.ok) {
    throw new Error(`SSR export failed with status ${response?.status ?? "unknown"}`);
  }

  const html = prefixPagesUrls(await response.text());
  await writeFile(path.join(clientDir, "index.html"), html);
  await writeFile(path.join(clientDir, "404.html"), html);

  const files = await walkFiles(clientDir);
  await Promise.all(
    files.map(async (filePath) => {
      const fileStats = await stat(filePath);
      if (!fileStats.isFile()) {
        return;
      }

      const fileContent = await readFile(filePath, "utf8");
      const rewritten = prefixPagesUrls(fileContent);

      if (rewritten !== fileContent) {
        await writeFile(filePath, rewritten);
      }
    }),
  );

  console.log(`Exported Pages HTML to ${path.join(clientDir, "index.html")}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});