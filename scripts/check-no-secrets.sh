#!/usr/bin/env bash
# High-signal secret / credential pattern guard for CI and local preflight.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

EXCLUDES=(
  --glob '!.git/**'
  --glob '!node_modules/**'
  --glob '!.next/**'
  --glob '!out/**'
  --glob '!package-lock.json'
  --glob '!design/preview/**'
  --glob '!**/pagefind/**'
)

PATTERNS=(
  'AKIA[0-9A-Z]{16}'
  'ASIA[0-9A-Z]{16}'
  'ghp_[A-Za-z0-9]{36}'
  'github_pat_[A-Za-z0-9_]{20,}'
  'gho_[A-Za-z0-9]{36}'
  'ghu_[A-Za-z0-9]{36}'
  'ghs_[A-Za-z0-9]{36}'
  '-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----'
  'eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}'
  'sk_live_[A-Za-z0-9]{20,}'
  'sk-[A-Za-z0-9]{20,}'
  'xox[baprs]-[A-Za-z0-9-]{10,}'
)

ASSIGN_PATTERNS=(
  '(?i)(api[_-]?key|secret[_-]?key|private[_-]?key|auth[_-]?token|access[_-]?token)\s*[:=]\s*['\''\"][A-Za-z0-9_\-]{16,}['\''\"]'
)

found=0

if ! command -v rg >/dev/null 2>&1; then
  echo "::error::ripgrep (rg) is required for secret pattern checks"
  exit 1
fi

# Fail if dotenv / key material is tracked by git.
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  tracked="$(
    git ls-files | grep -E '(^|/)\.env($|\.)|(^|/)\.env\..+\.local$|\.pem$|\.key$|\.p12$|\.pfx$|credentials\.json$|id_rsa$|id_dsa$|id_ecdsa$|id_ed25519$|service-account.*\.json$' \
      | grep -v '\.env\.example$' || true
  )"
  if [[ -n "$tracked" ]]; then
    echo "::error::Tracked credential / env files must not be committed:"
    echo "$tracked"
    found=1
  fi
fi

# Untracked local env files are fine; warn if a real .env exists locally in CI workspace.
if [[ -f .env || -f .env.local || -f .env.production ]]; then
  if [[ "${CI:-}" == "true" ]]; then
    echo "::error::Local .env file present in CI workspace (should be gitignored / absent)."
    found=1
  else
    echo "note: local .env present (ok if gitignored)."
  fi
fi

for pattern in "${PATTERNS[@]}"; do
  if rg -n --pcre2 -e "$pattern" "${EXCLUDES[@]}" . >/tmp/secret-hits.txt 2>/dev/null; then
    echo "::error::Potential secret pattern matched: $pattern"
    cat /tmp/secret-hits.txt
    found=1
  fi
done

for pattern in "${ASSIGN_PATTERNS[@]}"; do
  if rg -n --pcre2 -e "$pattern" "${EXCLUDES[@]}" --glob '!.env.example' . >/tmp/secret-hits.txt 2>/dev/null; then
    echo "::error::Hardcoded credential assignment matched: $pattern"
    cat /tmp/secret-hits.txt
    found=1
  fi
done

# NEXT_PUBLIC_* is browser-visible — never name private credentials that way.
if rg -n --pcre2 \
  -e 'NEXT_PUBLIC_(?!SITE_URL|BASE_PATH|FORMSPREE_ID|PLAUSIBLE_DOMAIN)[A-Z0-9_]*(SECRET|TOKEN|PASSWORD|PRIVATE|KEY)\b' \
  "${EXCLUDES[@]}" . >/tmp/secret-hits.txt 2>/dev/null; then
  echo "::error::Suspicious NEXT_PUBLIC_* secret-like variable name (client-exposed)."
  cat /tmp/secret-hits.txt
  found=1
fi

if [[ "$found" -ne 0 ]]; then
  exit 1
fi

echo "Secret pattern guard passed."
