module.exports = {
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "next/core-web-vitals"],
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
  },
}
