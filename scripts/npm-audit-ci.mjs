#!/usr/bin/env node
/**
 * CI npm audit gate:
 * - Always fail on critical.
 * - Fail on high unless the advisory package is explicitly allowlisted
 *   (temporary, with reason — usually package-age policy).
 */
import { execSync } from "node:child_process";

/** @type {Record<string, string>} */
const HIGH_ALLOWLIST = {
  // next@16.2.12 is <14 days old (package age policy). Bump when eligible.
  next: "Awaiting package-age-eligible Next patch (≥16.2.12).",
  // Transitive of next@16.2.10; cleared by Next bump above.
  postcss: "Pulled in by next@16.2.10; cleared when Next is bumped.",
  sharp: "Pulled in by next@16.2.10; cleared when Next is bumped.",
  // MDX is authored in-repo (trusted). Upstream fix is 6.x major — schedule separately.
  "next-mdx-remote": "Trusted first-party MDX only; major upgrade tracked separately.",
};

let report;
try {
  execSync("npm audit --json", { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  report = { metadata: { vulnerabilities: { critical: 0, high: 0 } }, vulnerabilities: {} };
} catch (error) {
  const stdout = error.stdout?.toString?.() || "";
  try {
    report = JSON.parse(stdout);
  } catch {
    console.error("Failed to parse npm audit JSON.");
    process.exit(1);
  }
}

const vulns = report.vulnerabilities || {};
const critical = [];
const highBlocking = [];
const highAllowed = [];

for (const [name, entry] of Object.entries(vulns)) {
  const severity = entry.severity;
  if (severity === "critical") {
    critical.push(name);
  } else if (severity === "high") {
    if (HIGH_ALLOWLIST[name]) {
      highAllowed.push(`${name}: ${HIGH_ALLOWLIST[name]}`);
    } else {
      highBlocking.push(name);
    }
  }
}

if (highAllowed.length) {
  console.log("Allowlisted high advisories (temporary):");
  for (const line of highAllowed) console.log(`  - ${line}`);
}

if (critical.length || highBlocking.length) {
  if (critical.length) {
    console.error("Critical advisories (must fix):", critical.join(", "));
  }
  if (highBlocking.length) {
    console.error("High advisories not allowlisted:", highBlocking.join(", "));
  }
  process.exit(1);
}

console.log("npm audit CI gate passed (no unallowlisted critical/high).");
