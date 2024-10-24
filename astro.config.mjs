import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  // site: 'https://smm-reviews-panel.vercel.app',
  // site: 'https://smmsearch.io',
  site: 'https://smmsearch.io/',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(),
    sitemap({
      filter: (page) =>
        page !== `${mainSite}admin/` &&
        page !== `${mainSite}search/` &&
        page !== `${mainSite}services/search/`
    }),
  ],
});














