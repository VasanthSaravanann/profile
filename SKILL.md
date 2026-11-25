---
name: profile-portfolio
description: Operate and update Vasanth Saravanan's production portfolio at vasanthsaravanan.me — a TanStack Start + React 19 single page prerendered to static HTML and deployed by GitHub Actions to GitHub Pages. Use when adding or editing projects, publications, experience, skills or copy; touching the Pages workflow, CNAME, prerender pipeline or 404 generation; verifying that localhost matches production; or reconstructing the history and reasoning behind the site.
---

# Profile — vasanthsaravanan.me

The public portfolio for Vasanth Saravanan. One route (`/`), prerendered at build
time to static HTML, served from GitHub Pages on a custom domain.

| Fact               | Value                                                               |
| ------------------ | ------------------------------------------------------------------- |
| Repository         | `github.com/VasanthSaravanann/profile`                              |
| Production URL     | `https://vasanthsaravanan.me`                                       |
| Host               | GitHub Pages, deployed by `.github/workflows/deploy-pages.yml`      |
| Build output       | `dist/client/` (`index.html`, `404.html`, `assets/`, `favicon.svg`) |
| Custom domain      | `CNAME` at repo root → `vasanthsaravanan.me`                        |
| Node version       | 22.12.0 (pinned in CI; `engines.node >= 22.12.0`)                   |
| Deployment trigger | push to `main`, or manual `workflow_dispatch`                       |

The site is static-only in production. There is no runtime server, no API route, no
database and no client-side router beyond the single prerendered page (in-page
anchors only).

## Stack

- TanStack Start `~1.168` + TanStack Router `1.170.42`, React 19.2
- Vite 7.3 with `@lovable.dev/vite-tanstack-config` (includes the React, Tailwind,
  tsconfig-paths and component-tagger plugins — do not add them again)
- Tailwind CSS 4.2 (`src/styles.css`), Motion 12.40
- TypeScript 5.8, ESLint 9 + Prettier
- Fonts: Fraunces, Inter, JetBrains Mono loaded from Google Fonts via `@import` in
  `src/styles.css`

## Production invariants

Treat these as load-bearing. A content update must not disturb them.

1. **`nitro: false` stays.** With Nitro enabled the build emits a Cloudflare Worker
   (`wrangler.json`, `_headers`, deploy config) this repo never deploys. The build
   script and Pages workflow expect static files in `dist/client`.
2. **`base: "/"` stays.** The site is served from the domain root, not from
   `/profile/`. This was fixed on 2026-06-19 when the custom domain was added.
3. **`CNAME` stays at the repo root** with exactly `vasanthsaravanan.me`. The workflow
   copies it into `dist/client`; deleting it drops the custom domain on the next
   deploy.
4. **Prerender stays on** for `/` in `vite.config.ts`
   (`tanstackStart.pages: [{ path: "/", prerender: { enabled: true } }]`). The
   prerenderer runs `src/server.ts`, which is also the dev SSR entry. It is never a
   deployed server.
5. **`scripts/write-404.mjs` stays in the build** (`npm run build`). Pages serves
   `404.html` for unknown paths; the script copies the prerendered home page to it.
   Do not commit `404.html` or `dist/`.
6. **The CI native-binary step stays.** The lockfile is generated on macOS and omits
   the `linux-x64` variants of Rollup and Tailwind Oxide. The workflow derives their
   versions from the lockfile and installs them with `--no-save`; removing this breaks
   the Linux build.
7. **Node 22.12.0** is the supported floor. Do not raise it in CI without updating
   `engines` and testing the prerender.

## Repository map

| Path                                                  | What it is                                                                                                        |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/routes/index.tsx`                                | the only route: page `<head>` and metadata (title, description, OG tags)                                          |
| `src/routes/__root.tsx`                               | root shell, error boundary, 404 component, QueryClient provider                                                   |
| `src/components/portfolio/Portfolio.tsx`              | composes the page: Nav, Hero, About, Experience, Projects, Publications, Skills, Contact, footer, scroll progress |
| `src/components/portfolio/Hero.tsx`                   | 01 hero copy and availability status                                                                              |
| `src/components/portfolio/About.tsx`                  | 02 three-column positioning                                                                                       |
| `src/components/portfolio/Experience.tsx`             | 03 roles timeline                                                                                                 |
| `src/components/portfolio/Projects.tsx`               | 04 project list — **the file edited for new repos**                                                               |
| `src/components/portfolio/Publications.tsx`           | 05 four IEEE / conference papers, DOI links                                                                       |
| `src/components/portfolio/Skills.tsx`                 | 06 toolkit groups                                                                                                 |
| `src/components/portfolio/Contact.tsx`                | 07 contact links                                                                                                  |
| `src/components/portfolio/Nav.tsx`                    | fixed nav and mobile menu; anchors must match section ids                                                         |
| `src/components/portfolio/Section.tsx`                | shared section heading + `Reveal` animation wrapper                                                               |
| `src/styles.css`                                      | Tailwind theme tokens, fonts, gradients, grain, skip link                                                         |
| `src/server.ts`, `src/start.ts`, `src/lib/error-*.ts` | SSR/prerender error handling; not deployed                                                                        |
| `src/routeTree.gen.ts`                                | generated router tree — do not hand-edit                                                                          |
| `scripts/write-404.mjs`                               | post-build `index.html` → `404.html` copy                                                                         |
| `.github/workflows/deploy-pages.yml`                  | install, build, `.nojekyll`, CNAME, upload, deploy                                                                |
| `CNAME`                                               | custom domain for Pages                                                                                           |
| `vite.config.ts`                                      | base path, Nitro off, prerender config, server entry                                                              |
| `public/favicon.svg`                                  | static asset copied into `dist/client`                                                                            |

`dist/`, `node_modules/` and `.wrangler/` are gitignored. Production HTML is a CI
artifact, not a committed file.

## Page model

Sections are numbered manually and rendered in this order:

```text
01 Hero        #top        Hero.tsx
02 About       #about      About.tsx
03 Experience  #experience Experience.tsx
04 Projects    #projects   Projects.tsx
05 Research    #publications Publications.tsx
06 Toolkit     #skills     Skills.tsx
07 Contact     #contact    Contact.tsx
```

If a section is added or removed, update its `index` prop, the `Nav` anchor list and
the hero's `01 / 07` counter. Projects and publications are data arrays; Experience and
Skills are inline arrays. Copy is plain JSX, not MDX or JSON.

### Project entry schema

```ts
type Project = {
  name: string; // exact repo name, linked as the heading
  role: string; // "Discipline · Focus", e.g. "Systems · Governance"
  year: string; // "2026" or "2025 — 2026"
  blurb: string; // 2 sentences: what it is, then evidence/measurement
  tags: string[]; // 5 short labels
  repo: string; // GitHub URL (also used as the React key)
  demo?: string; // live URL, only if it actually responds
  demoLabel?: string; // defaults to "Live demo"; use "Live preview" for demos
};
```

Projects are ordered newest first. Each entry renders as a two-column article with a
`00` ordinal, so insertion order is the only ranking mechanism.

### Copy voice

Specific, measured, unhyped. State the mechanism, then the number that proves it. No
"revolutionary", "seamless", "cutting-edge", no exclamation marks. Em dashes are used
for asides; tags are sentence-case except proper nouns. Blurbs are two sentences and
fit roughly 400 characters. Do not repeat a number that the source README does not
state, and do not convert a preview into a production claim.

## Update protocol — adding a project

1. **Fetch the source, don't paraphrase the GitHub description.**
   ```bash
   cd ~/Desktop
   git clone --depth 1 https://github.com/VasanthSaravanann/<repo>.git
   ```
   Read `README.md` (and `CHANGELOG.md` if present) and copy only claims that are
   stated there. Note test count, measured numbers, platform limits and any
   "no savings claim" style caveat.
2. **Check the links before adding them.**
   ```bash
   curl -s -o /dev/null -w '%{http_code}\n' <demo-url>
   ```
   A demo link is added only for a 2xx response. If the project is an npm package,
   check the registry; an unpublished package gets no link.
3. **Insert the entry at the top of `projects`** in
   `src/components/portfolio/Projects.tsx`, newest first. Keep the `repo` URL in the
   `VasanthSaravanann` namespace.
4. **Use `demoLabel` when "Live demo" is wrong** (for example a session-only preview
   is a "Live preview"). The render falls back to "Live demo" when it is omitted.
5. **Format only the files you touched.**
   ```bash
   npx prettier --write src/components/portfolio/Projects.tsx
   npx eslint src/components/portfolio/Projects.tsx
   ```
   Do not run repo-wide `prettier --write` in a content change; see the lint baseline
   below.
6. **Build and assert the content is in the prerendered HTML.**
   ```bash
   npm run build
   grep -c '<project-name>' dist/client/index.html   # must be > 0
   ls -l dist/client/index.html dist/client/404.html
   ```
7. **Typecheck**, then commit and push:
   ```bash
   npx tsc --noEmit
   git add src/components/portfolio/Projects.tsx
   git commit -m "feat(projects): add <name>"
   git push origin main
   ```
8. **Verify the deployment**, not just the push (see below).

## Verification

Local gates, in order:

```bash
cd /Users/sham/Desktop/profile
npm run build          # vite build + prerender + 404 copy
npx tsc --noEmit       # must exit 0
npx eslint <touched files>   # must exit 0
```

`npm run build` should print `Prerendered 1 pages: /` and
`Wrote .../dist/client/404.html`. Build output includes a harmless warning about the
Google Fonts `@import` ordering in `src/styles.css`; it is pre-existing and does not
affect the emitted CSS.

**Lint baseline (2026-11-25):** repo-wide `npm run lint` reports 12 pre-existing
Prettier errors in `About.tsx`, `Experience.tsx`, `Section.tsx`,
`src/lib/error-capture.ts` and `src/server.ts`. They are formatting-only and predate
this log. Do not treat them as a regression, and do not reformat those files inside a
content commit; fix them in a separate formatting-only change if desired.

Production verification after a push:

```bash
gh run list --branch main --limit 3
gh run watch <run-id> --exit-status
curl -s https://vasanthsaravanan.me | grep -o '<new project name>'
curl -s -o /dev/null -w '%{http_code}\n' https://vasanthsaravanan.me
```

The workflow deploys only from `main`. A successful run means: install (with the
Linux native binaries), `npm run build`, `.nojekyll`, CNAME copy, Pages artifact
upload, `deploy-pages@v4`. The live domain is the only source of truth; local `dist/`
does not contain `CNAME` because CI adds it.

## Failure history (what already went wrong)

Derived from the commit log; useful before touching deployment.

| Date       | Event                                                                                                                                           | Lesson                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 2026-05-31 | Initial commit; Pages CI install failures for Rollup, Lightning CSS and Tailwind binaries                                                       | native optional deps must be installed explicitly on Linux                     |
| 2026-05-31 | Pages base set to `/profile`                                                                                                                    | wrong once a custom domain is used                                             |
| 2026-06-19 | `CNAME` added; base changed to `/`; global error handlers; external links hardened; contact links added                                         | root-relative assets and a committed CNAME are the production contract         |
| 2026-10-30 | Education updated; project list rewritten; TanStack Start XSS (CVE-2026-102989) fixed; metrics panel and featured intro removed; full name used | keep dependencies patched; simplify rather than decorate                       |
| 2026-10-31 | Pages deploy, prerender pipeline and content fixed                                                                                              | the build must produce `dist/client/index.html` and `404.html`                 |
| 2026-11-03 | ICCT-SD 2026 proceedings linked                                                                                                                 | publications need resolvable, non-DOI links when available                     |
| 2026-11-17 | Accessibility, reduced-motion and load-performance pass; two research projects added; hero repositioned from frontend developer to AI engineer  | motion respects `prefers-reduced-motion`; copy follows the current positioning |
| 2026-11-25 | Ledger and pi-subagent-cascade added; `SKILL.md` created                                                                                        | see the update log below                                                       |

## Update log

### 2026-11-25 — Ledger and pi-subagent-cascade

**Commits:** `235b9be` feat(projects): add Ledger and pi-subagent-cascade; followed by
the docs commit that adds this file.

**Sources fetched** (shallow clones, reference only — not part of this repo):

```text
~/Desktop/Ledger                 github.com/VasanthSaravanann/Ledger
~/Desktop/pi-subagent-cascade    github.com/VasanthSaravanann/pi-subagent-cascade
```

**What was verified in the sources**

- **Ledger** — Rust 1.85+ CLI (33 modules), 136 tests (144 with the optional `ui`
  feature), Ed25519 operator identities, hash-bound hiring-manager + Legal sign-off,
  a hash-chained send log, a stdlib-only `verify_log.py`, and a seeded fixture that
  commits 147 emails, blocks 3 and verifies; flipping one byte makes verification fail
  at entry 0. The Vercel browser workspace is a session-only preview (48 generated
  candidates, no auth, no storage, no signatures) and returned HTTP 200
  (`https://ledger-pilot-chi.vercel.app`).
- **pi-subagent-cascade** — TypeScript Pi extension, v0.2.1, 78 tests, six
  reproducible fixtures (one per ladder branch), host-run gate, throwaway git
  worktree per attempt, JSONL cost ledger with per-repo trailing-24h ceiling,
  single-flight lock, and an explicit "no savings claim" limitation. The npm package
  was **not** published (`registry.npmjs.org` returned `{"error":"Not found"}`), so no
  package link was added.

**Changes made**

- Added `Ledger` as project 01, role `Systems · Governance`, tags
  `Rust, Ed25519, Hash Chain, TanStack Start, Governance`, with
  `demo: https://ledger-pilot-chi.vercel.app` and `demoLabel: "Live preview"`.
- Added `pi-subagent-cascade` as project 02, role `Tooling · LLM Agents`, tags
  `TypeScript, Pi Extension, Git Worktrees, Model Routing, Cost Ledger`, no demo link.
- Extended the `Project` type with optional `demoLabel` and rendered
  `{p.demoLabel ?? "Live demo"}` so Ledger's session-only preview is not mislabelled
  as a production demo.
- Added `TypeScript` to the Frontend toolkit group.
- No changes to `CNAME`, `vite.config.ts`, the Pages workflow, metadata or section
  numbering. Production setup retained as-is.
- Created `SKILL.md` (this file) as the operating manual and complete change log.

**Verification evidence**

```text
npm run build      → 68 modules transformed, Prerendered 1 pages: /, 404.html written
grep Ledger        → present in dist/client/index.html
grep pi-subagent   → present in dist/client/index.html
grep ledger-pilot  → present in dist/client/index.html
npx tsc --noEmit   → exit 0
npx eslint <two touched files> → exit 0
```

**Push and deploy**

- `git push origin main` → Pages workflow builds from `main`.
- Live checks after deployment: `https://vasanthsaravanan.me` returns 200 and the
  prerendered HTML contains both new project names and the preview link.
- Rollback, if needed: `git revert <commit> && git push origin main`, or run the
  workflow from the previous good commit. Never force-push `main`; it is the deploy
  branch.

### Earlier changes

The full sequence is in `git log --date=short --pretty=format:'%h %ad %s'`. The
summary in "Failure history" above covers every commit from the initial commit
(2026-05-31) through 2026-11-17: Pages bring-up and base-path fixes, the CNAME move,
accessibility/performance work, publication links, the education and positioning
rewrite, and the previous project additions (`mcp-provenance-boundary`,
`mmd-sprt-harness`). Nothing earlier was removed in this update.

## Project context — the two additions

### Ledger

Audit-grade candidate feedback for a deliberately narrow hiring pilot. The problem it
answers: a rejected candidate cannot see which requirement they missed, and the
employer cannot prove afterwards that a rule was applied rather than a preference.

- **Recorder:** Rust CLI, one workspace per pilot, `flock` single-writer, files `0600`
  and workspace `0700`.
- **Disposition:** exactly `GATE` (stated requirement not met), `FIELD` (met, a
  stronger field appointed) or `ADMIN` (closed for an unrelated reason). No free text.
- **Copy:** five versioned knockouts `GATE-01`…`GATE-05`, signed by a hiring manager
  and Legal; the signature binds to the copy hash, so edits invalidate approval.
- **Proof:** one append-only entry per send, each hashing the previous head, plus a
  schema version and timestamps. `verify_log.py` re-derives the chain with the Python
  standard library only.
- **Circuit-breakers:** completeness, gate consistency against ATS knockout answers,
  and version resolution. Nothing renders from unsigned copy.
- **Honest limits:** no email sending (`queued` ≠ `sent`), no ATS API, no model in the
  send path, single operator per process, macOS/Linux only, preview has no auth or
  storage, and a full-file rewrite is invisible without an off-host anchor.
- **Repo:** `https://github.com/VasanthSaravanann/Ledger` · MIT · Rust 1.85+
- **Preview:** `https://ledger-pilot-chi.vercel.app` (session-only demo, not the log)

Verify locally:

```bash
cd ~/Desktop/Ledger
cargo test --locked          # 136 tests
cargo build --release
./target/release/ledger demo seed --data /tmp/pilot --force --record
./verify_log.py /tmp/pilot/send_log.jsonl   # 147 entries verified
```

### pi-subagent-cascade

Cheap-to-frontier escalation for delegated coding work, decided by the result instead
of a pre-dispatch guess.

- **Ladder:** `t0` cheap model in its own worktree → one `t0-repair` with the gate
  error → `t1` frontier model. A pass on the last attempt is the only green outcome.
- **Gate:** run by the host after the child exits, never trusted from the child;
  `PI_CASCADE_GATE=1` marks a host run. Already-red gates are `PREEXISTING` and spend
  nothing; environment failures (`ENV_FAIL`) never escalate the model.
- **Isolation:** every attempt runs in a throwaway git worktree; a failed attempt is
  discarded. `node_modules`, `.venv`, `venv`, `target` and `vendor` are symlinked in,
  not committed to the patch.
- **Spend:** one JSONL row per attempt in `~/.pi/agent/cascade/ledger.jsonl` (tier,
  outcome, gate exit, error code, tokens, cost); per-repo trailing-24h UTC ceiling,
  default `$1.00`; single-flight lock; `dev` credit rows excluded from dollar stats.
- **Honest limits:** six synthetic fixtures, not a benchmark; no savings claim;
  gitignored files other than the linked directories are absent from the worktree; one
  cascade at a time; a timeout that fires before usage is recorded reports `$0`.
- **Repo:** `https://github.com/VasanthSaravanann/pi-subagent-cascade` · MIT ·
  TypeScript, Pi 1.6+, Node 20+ · v0.2.1

Verify locally:

```bash
cd ~/Desktop/pi-subagent-cascade
npm install
npm run check                # tsc --noEmit + 78 vitest tests
sh fixtures/escalation-t1/setup.sh
```

## Common tasks

- **Add a publication:** add an object to `papers` in `Publications.tsx` with `title`,
  `venue`, and either `doi` + `url` or `status`. Keep it chronological (newest or
  most relevant first).
- **Change the headline:** `title` array in `Hero.tsx`; the word ending in `details.`
  receives the gold italic gradient. Keep the line breaks deliberate at 9vw.
- **Change metadata:** `src/routes/index.tsx` `head()` — title, description, OG title
  and OG description. Keep the AI-engineer positioning.
- **Change the domain:** update the `CNAME` file, DNS at the registrar, and the Pages
  custom-domain setting together, then redeploy. Do not leave a stale `CNAME`.
- **Preview production locally:** `npm run build && npx vite preview` serves
  `dist/client`; `npm run dev` is the SSR dev server, not the static output.
- **Debug a blank deploy:** check the Actions log for the native-binary step, confirm
  `dist/client/index.html` exists, confirm `.nojekyll` and `CNAME` were copied, then
  hard-refresh the domain. A 404 on assets usually means `base` drifted from `/`.
