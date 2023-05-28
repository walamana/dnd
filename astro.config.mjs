import { defineConfig } from 'astro/config';
import vue from "@astrojs/vue";

import mdx from "@astrojs/mdx";
import {defaultLayout} from "astro-default-layout";

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), mdx()],
  markdown: {
    remarkPlugins: [defaultLayout],
    extendDefaultPlugins: true
  }
});