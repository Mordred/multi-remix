import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { dirname as pathDirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirname = (url) => pathDirname(fileURLToPath(url));

export default defineConfig({
  plugins: [
    remix({
      appDirectory: resolve(dirname(import.meta.url), "./app/"),
      buildDirectory: resolve(dirname(import.meta.url), "../dist/admin/"),
    }),
  ],
});
