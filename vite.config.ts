import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Use /ferlinturnip/ only for production build command, localhost uses /
  const base = command === 'build' && process.env.DEPLOY_ENV === 'github-pages' ? '/ferlinturnip/' : '/';
  return {
    plugins: [react(), tailwindcss()],
    // Sesuaikan dengan nama repository Anda
    base: base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0'
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_URL': JSON.stringify(env.GEMINI_API_URL),
    },
  };
});
