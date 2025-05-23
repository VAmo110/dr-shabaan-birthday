<<<<<<< HEAD
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ← ده هو المفتاح السحري
  plugins: [react()],
});

=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/birthday-website/',
});
>>>>>>> 5327f6b3b6e8b57f65826a88d674e934c60c91b5
