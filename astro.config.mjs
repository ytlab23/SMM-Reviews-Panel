import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  site: 'https://smm-reviews-panel.vercel.app',
  output: 'server',
  integrations: [tailwind(), sitemap()],
  adapter: vercel()
});