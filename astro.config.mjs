import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  site: 'https://smm-reviews-panel.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(),
    sitemap({
      filter: (page) =>
        page !== `https://smm-reviews-panel.vercel.app/admin/` &&
        page !== `https://smm-reviews-panel.vercel.app/search` &&
        page !== `https://smm-reviews-panel.vercel.app/services/search`
    }),
  ],
});