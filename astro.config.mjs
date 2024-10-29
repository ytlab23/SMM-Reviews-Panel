import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";

import sitemap from "@astrojs/sitemap";

import metaTags from 'astro-meta-tags';

// https://astro.build/config
export default defineConfig({
  // site: 'http://localhost:4321',
  // site: 'https://smm-reviews-panel.vercel.app',
  // site: 'https://smmsearch.io',
  site: 'https://smmsearch.io/',
  output: 'server',
  adapter: vercel(),
  integrations: [tailwind(), metaTags(), sitemap({
    filter: (page) =>
      page !== `https://smmsearch.io/admin/` &&
      page !== `https://smmsearch.io/search/` &&
      page !== `https://smmsearch.io/services/search/`
  })],
});