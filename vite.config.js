import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ لازم يكون / فقط
  plugins: [react()],
});
