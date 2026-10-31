// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, componentTagger
//     (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    base: "/",
  },
  // Deployment target is GitHub Pages: static files only. Nitro would build a
  // Cloudflare Worker (wrangler.json, _headers, deploy config) that we never
  // deploy anywhere, so it is disabled. Static HTML comes from TanStack
  // Start's built-in prerenderer configured below.
  nitro: false,
  tanstackStart: {
    // Prerender the single route at build time via the server entry below,
    // producing dist/client/index.html for GitHub Pages. scripts/write-404.mjs
    // then copies it to 404.html for Pages' 404 fallback.
    pages: [{ path: "/", prerender: { enabled: true } }],
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR
    // error wrapper). Used by dev SSR and by the prerenderer; never deployed as
    // a runtime server.
    server: { entry: "server" },
  },
});
