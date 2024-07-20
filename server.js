import express from "express";
import { dirname as pathDirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequestHandler } from "@remix-run/express";

export const dirname = (url) => pathDirname(fileURLToPath(url));

const app = express();

const adminDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          root: resolve(dirname(import.meta.url), "./admin/"),
          configFile: resolve(
            dirname(import.meta.url),
            "./admin/vite.config.mjs"
          ),
          server: {
            middlewareMode: true,
            hmr: { port: 10001, host: "localhost" },
          },
        })
      );

const adminBuild = adminDevServer
  ? () => adminDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import(
      resolve(dirname(import.meta.url), "./dist/admin/server/index.js")
    );

app.all(
  "/admin/*",
  createRequestHandler({
    build: adminBuild,
  })
);

const blogDevServer =
  process.env.NODE_ENV === "production"
    ? null
    : await import("vite").then((vite) =>
        vite.createServer({
          root: resolve(dirname(import.meta.url), "./blog/"),
          configFile: resolve(
            dirname(import.meta.url),
            "./blog/vite.config.mjs"
          ),
          server: {
            middlewareMode: true,
            hmr: { port: 10002, host: "localhost" },
          },
        })
      );

const blogBuild = blogDevServer
  ? () => blogDevServer.ssrLoadModule("virtual:remix/server-build")
  : await import(
      resolve(dirname(import.meta.url), "./dist/blog/server/index.js")
    );

app.all(
  "/blog/*",
  createRequestHandler({
    build: blogBuild,
  })
);

app.listen(3000, () => {
  console.log("Admin listening on http://localhost:3000/admin/");
  console.log("Blog listening on http://localhost:3000/blog/");
})
