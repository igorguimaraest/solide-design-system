import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({base:"./",plugins:[react()],build:{outDir:'preview-dist',rollupOptions:{input:'preview/index.html'}}});
