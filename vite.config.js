import { resolve } from "node:path";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy"; 
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  server: {
    port: 1234,
  },
  css: {
    devSourceMap: true,
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        alta: resolve(__dirname, "views/alta.html"),
        carrito: resolve(__dirname, "views/carrito.html"),
        contacto: resolve(__dirname, "views/contacto.html"),
        nosotros: resolve(__dirname, "views/nosotros.html"),
        inicio: resolve(__dirname, "index.html"),
      },
    },
  },
  plugins: [
    handlebars(),
    viteStaticCopy({
      targets: [
        {
          src: "templates/*.hbs",
          dest: "templates"
        }
      ]
    })
  ],
  assetsInclude: ['**/*.hbs'],
});
