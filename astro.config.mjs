import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";
import mdx from "@astrojs/mdx";
import { defaultLayout } from "astro-default-layout";
import sanity from "astro-sanity";
import node from "@astrojs/node";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx(), sanity({
    projectId: "astro-wiki"
  })],
  markdown: {
    remarkPlugins: [defaultLayout],
    extendDefaultPlugins: true
  },
  output: "hybrid",
  adapter: netlify()
});