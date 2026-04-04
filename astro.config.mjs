import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://fsabado.com',
  base: '/',
  output: 'static',
  integrations: [tailwind()],
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
