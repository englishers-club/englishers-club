import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/** قاعدة الموقع العامة لوسوم Open Graph (واتساب/تيليجرام/فيسبوك). على Vercel: عيّن VITE_PUBLIC_SITE_URL إذا استخدمت نطاقاً مخصصاً. */
function resolvePublicSiteUrl(env: Record<string, string>): string {
  const fromEnv = (env.VITE_PUBLIC_SITE_URL || '').trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const vercel = (process.env.VERCEL_URL || '').trim().replace(/\/$/, '');
  if (vercel) return `https://${vercel}`;
  return 'https://englishers-club.vercel.app';
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const siteUrl = resolvePublicSiteUrl(env);
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: true,
          secure: false,
          ws: false,
          configure: (proxy) => {
            proxy.on('error', (err, req, res) => {
              console.warn('[Vite] API proxy error:', err?.message);
            });
          },
        },
      },
    },
    plugins: [
      react(),
      {
        name: 'html-public-site-url',
        transformIndexHtml(html) {
          return html.split('%SITE_URL%').join(siteUrl);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
