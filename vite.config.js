import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import path from 'path';

export default defineConfig({
  preview: {
    port: 3000
  },
  plugins: [
    handlebars({
      partialDirectory: [
        path.resolve(__dirname, './src/components'),
        path.resolve(__dirname, './src/pages')
      ],
      compileOptions: {
        strict: true,
        preventIndent: true
      }
    })
  ],
  server: {
    fs: {
      strict: false
    }
  },
  optimizeDeps: {
    include: ['**/*.hbs']
  }
});