import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import { defaultLayout } from "astro-default-layout";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx(), sanity({
    projectId: "astro-wiki"
  })],
  markdown: {
    remarkPlugins: [defaultLayout],
    extendDefaultPlugins: true
  }
});