import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
  },
  define: {
    'process.env': {
      VITE_KAKAO_MAP_API_KEY: JSON.stringify(process.env.VITE_KAKAO_MAP_API_KEY),
    },
  },
  
});
