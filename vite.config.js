import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ← ده هو المفتاح السحري
  plugins: [react()],
});

