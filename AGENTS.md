# AGENTS.md

## Cursor Cloud specific instructions

This is a single static **Next.js 16 (App Router)** site — a DevOps consultant portfolio exported for GitHub Pages. There is one app; there are no separate backend/services. Node 22 is required (`.nvmrc` / `engines.node >=22`); the package manager is **npm** (`package-lock.json`).

The startup update script already runs `npm install`, so dependencies are present when a session begins.

Standard commands are documented in `README.md` and `package.json` scripts; use those as the source of truth. Key ones:

- Dev server: `npm run dev` (Turbopack, serves at `http://localhost:3000`).
- Lint: `npm run lint` · Typecheck: `npm run typecheck` · Tests: `npm run test` (Vitest + jsdom).
- Build: `npm run build` — note this is a **static export** (`output: "export"` in `next.config.ts`), with a `prebuild` RSS step and a `postbuild` Pagefind index step. Output goes to `out/`.

Non-obvious caveats:

- `npm run start` (`next start`) does **not** work with `output: "export"`. To preview the built site, serve the static export instead: `npx serve out`.
- The contact form has no backend. When `NEXT_PUBLIC_FORMSPREE_ID` is unset, submitting a valid form opens a `mailto:` draft and shows a "Draft ready" confirmation — this is expected behavior, not a failure.
- For a GitHub Pages-style build, set `NEXT_PUBLIC_BASE_PATH=/devops-portfolio` (see `README.md`). Local dev/build without it serves from root `/`, which is fine for local testing.
- `.env.local` is optional (copy from `.env.example`); the app runs without it for local development.
- `npm audit` reports a few vulnerabilities in transitive deps; this does not block dev/lint/test/build. Versions are intentionally pinned (see `docs/PACKAGE_POLICY.md`) — do not bump packages casually.
