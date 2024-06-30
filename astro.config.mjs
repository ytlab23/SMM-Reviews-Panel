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
        page !== `https://smm-reviews-panel.vercel.app/saveServices/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/logout/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/messages/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/pages/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/pagesNew/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/pagesUpdate/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/profile/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/services/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/signin/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/site-settings/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/SMMPanel/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/SMMPanelNew/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/SMMPanelUpdate/` &&
        page !== `https://smm-reviews-panel.vercel.app/admin/users/` &&
        page !== `https://smm-reviews-panel.vercel.app/search/` &&
        page !== `https://smm-reviews-panel.vercel.app/services/search/`
    }),
  ],
});














