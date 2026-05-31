import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));

// Client-side global error handlers to catch runtime hydration errors and
// render a minimal fallback so the page remains usable instead of crashing.
if (typeof window !== "undefined") {
  const showFallback = (err?: unknown) => {
    try {
      console.error("Global runtime error:", err);
      const root = document.documentElement || document.body;
      if (root) {
        // Replace body content with a minimal fallback UI.
        document.body.innerHTML = `
          <main style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; display:flex;align-items:center;justify-content:center;min-height:100vh;">
            <div style="text-align:center;max-width:720px;padding:24px;">
              <h1 style="font-size:24px;margin:0 0 8px;">Something went wrong</h1>
              <p style="margin:0 0 16px;color:#666">An unexpected error occurred while loading the page. Try refreshing.</p>
              <button onclick="location.reload()" style="padding:8px 12px;border-radius:6px;border:1px solid #ccc;background:#fff">Refresh</button>
            </div>
          </main>
        `;
      }
    } catch (e) {
      // swallow
    }
  };

  window.addEventListener("error", (e) => {
    showFallback(e.error ?? e.message ?? e);
  });
  window.addEventListener("unhandledrejection", (e) => {
    showFallback(e.reason ?? e);
  });
}
