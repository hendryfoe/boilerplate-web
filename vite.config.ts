import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const dotenv = loadEnv(mode, process.cwd(), '');

  return {
    base: dotenv.VITE_BASE_PATH,
    plugins: [react()],
    build: {
      outDir: './build'
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            // '@layout-header-background': '#0747a6',
            // '@menu-dark-inline-submenu-bg': '#0747a6'
          },
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /date-fns\/locale$/,
          replacement: resolve(__dirname, 'date-fns-locales.js')
        },
        {
          find: 'components',
          replacement: resolve(__dirname, 'src/components')
        },
        {
          find: 'constants',
          replacement: resolve(__dirname, 'src/constants')
        },
        {
          find: 'contexts',
          replacement: resolve(__dirname, 'src/contexts')
        },
        {
          find: 'utils',
          replacement: resolve(__dirname, 'src/utils')
        },
        {
          find: 'hooks',
          replacement: resolve(__dirname, 'src/hooks')
        },
        {
          find: 'models',
          replacement: resolve(__dirname, 'src/models')
        },
        {
          find: 'pages',
          replacement: resolve(__dirname, 'src/pages')
        },
        {
          find: 'styles',
          replacement: resolve(__dirname, 'src/styles')
        },
        {
          find: 'services',
          replacement: resolve(__dirname, 'src/services')
        }
      ]
    }
  };
});
