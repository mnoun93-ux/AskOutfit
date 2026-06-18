import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://askoutfit.com",
  output: "static",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});