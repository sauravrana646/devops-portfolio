# Security notes

## Secrets policy

- **Never commit** `.env`, `.env.local`, private keys, tokens, or credentials.
- Use `.env.example` for documented *names* only (no real values).
- **`NEXT_PUBLIC_*` is public.** Anything with that prefix is embedded in the static client bundle. Do not store private API keys there.
- Allowed public vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BASE_PATH`, `NEXT_PUBLIC_FORMSPREE_ID`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- In GitHub Actions, set optional Formspree / Plausible values as **repository Variables** (`vars.*`), not Secrets — they are client-visible by design.
- Private credentials (if ever needed for CI-only tasks) must use GitHub **Secrets**, never `NEXT_PUBLIC_*`, and must not be printed in logs.

## CI gates

| Check | Where |
|-------|--------|
| Pattern + tracked-env guard | `scripts/check-no-secrets.sh` |
| Gitleaks | `.github/workflows/deploy.yml` → `secret-scan` |
| ESLint / typecheck / Vitest | `quality` job |
| npm audit (critical + gated high) | `scripts/npm-audit-ci.mjs` |
| Export validation + artifact scan | `quality` job after build |

## Known deferred advisories

High findings on `next@16.2.10` (and its transitive `postcss` / `sharp`) are temporarily allowlisted until a package-age-eligible Next patch (≥14 days old) can be pinned. See `scripts/npm-audit-ci.mjs`.

`next-mdx-remote` SSR advisory is mitigated operationally: MDX is first-party content under `content/blog/`, not untrusted user input.

## Formspree contact form

Repo Variable `NEXT_PUBLIC_FORMSPREE_ID` is baked into the static export at **build** time.

If the live form shows “Something went wrong sending the form”:

1. Open [Formspree dashboard](https://formspree.io/forms) → form `mqervyeq` (or your current ID)
2. Confirm / activate the form email (first submissions often require activation)
3. Set notification email to `sauravrana646@gmail.com`
4. Under form settings, allow the domain `sauravrana646.github.io` (or disable domain restriction)
5. Redeploy after changing the GitHub Variable (variable changes do not update already-built JS)

## Local preflight

```bash
npm run security:secrets
npm run security:audit
npm run lint && npm run typecheck && npm run test
```
