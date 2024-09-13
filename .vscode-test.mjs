import { defineConfig } from "@vscode/test-cli";

export default defineConfig({
  files: "out/ext-src/test/**/*.test.js",
});
