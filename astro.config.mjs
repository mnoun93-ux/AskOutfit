// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Global audience. Static output -> deployable to GitHub Pages / any host.
export default defineConfig({
  site: "https://askoutfit.com",
  output: "static",
  integrations: [react()],
  build: {
    inlineStylesheets: "auto",
  },
});
