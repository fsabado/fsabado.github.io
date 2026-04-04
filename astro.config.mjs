import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  site: 'https://fsabado.com',
  base: '/',
  output: 'static',
  integrations: [
    tailwind(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Francis Sabado',
        short_name: 'F. Sabado',
        description:
          'Senior Software Engineer — portfolio, projects, and writing.',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
      },
      workbox: {
        navigateFallback: '/offline.html',
        // Default 2 MiB skips large project images (e.g. screenshots)
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: [
          '**/*.{css,js,html,ico,png,jpg,jpeg,gif,webp,svg,webmanifest,woff2}',
        ],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
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
