import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import("eslint").Linter.Config[]} */
const nextCore = require("eslint-config-next/core-web-vitals");
const nextTs = require("eslint-config-next/typescript");

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "design/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },
  ...nextCore,
  ...nextTs,
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
];

export default eslintConfig;
