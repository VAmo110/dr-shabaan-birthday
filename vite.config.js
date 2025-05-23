import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ← مهم جداً يكون '/' بس
  plugins: [react()],
});
