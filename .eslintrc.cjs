module.exports = {
  root: true,
  env: { browser: true, es2020: true, amd: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    // "plugin:@tanstack/eslint-plugin-query/recommended",
    // "plugin:react-query/recommended",
    // "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  // plugins: ["react-refresh", "@tanstack/query", "react-query"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "react-hooks/rules-of-hooks": "off",
    // "@tanstack/query/exhaustive-deps": "error",
    // "@tanstack/query/prefer-query-object-syntax": "error",
    // "@tanstack/query/stable-query-client": "error",
  },
};
