import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ⚠️ لازم تكون './' علشان المسارات تشتغل صح على Netlify
  plugins: [react()],
});
