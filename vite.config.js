import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: './src/components'
    })
  ],
  build: {
    assetsInlineLimit: 0
  },
  preview: {
    port: 3000 
  }
});
