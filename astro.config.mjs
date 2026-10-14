// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // URL pública del sitio. Cámbiala aquí cuando tengas dominio propio.
  site: 'https://moriah-studio.netlify.app',
  // Las invitaciones demo no se indexan ni van al sitemap.
  integrations: [sitemap({ filter: (page) => !page.includes('/demos/') })],
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          // lucide-astro tiene un componente llamado `.Layout.astro`; sin esto, el CSS compartido sale como
          // `_astro/.Layout.[hash].css`, un archivo oculto que algunos hostings no publican.
          assetFileNames: (asset) => {
            const name = (asset.name ?? asset.names?.[0] ?? 'asset')
              .replace(/^\.+/, '') // sin punto inicial
              .replace(/\.[^.]+$/, '') // sin extensión
              .replace(/@_@.*$/, ''); // sin el sufijo interno de Astro
            return `_astro/${name || 'asset'}.[hash][extname]`;
          }
        }
      }
    }
  }
});
