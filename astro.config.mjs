import { defineConfig } from "astro/config";
import node from "@astrojs/node"; // Changed from vercel
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "http://examplesite.com",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  output: "server",
  
  // Add this server configuration
  server: {
    host: true,
    port: 10000
  },

  integrations: [
    react(),
    sitemap(),
    tailwind({ applyBaseStyles: false }),
    AutoImport({
      imports: [/* your imports */],
    }),
    mdx(),
  ],

  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }]
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },

  // Changed to Node adapter
  adapter: node({
    mode: "standalone"
  })
});
