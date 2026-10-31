// GitHub Pages serves `404.html` for unknown paths. This site is a single
// prerendered route, so we reuse the home page HTML. Everything else —
// rendering index.html — is handled by TanStack Start's built-in prerenderer
// (see `tanstackStart.pages` in vite.config.ts), which runs src/server.ts.
import { copyFile } from "node:fs/promises";
import path from "node:path";

const clientDir = path.join(process.cwd(), "dist/client");

await copyFile(
  path.join(clientDir, "index.html"),
  path.join(clientDir, "404.html"),
);

console.log(`Wrote ${path.join(clientDir, "404.html")}`);
