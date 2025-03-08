// eslint.config.mjs
import eslintJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser
      }
    }
  },
  eslintJs.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "no-undef": "off"
    }
  },
  {
    ignores: [
      "node_modules/",
      "dist/",
      "coverage/",
      "__test__/",
      "**/*.js",
      "**/*.mjs",
      "/*.json",
      "/*.ts"
    ]
  }
];
