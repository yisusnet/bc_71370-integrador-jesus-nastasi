import { resolve } from "node:path"
export default {
    server: {
        port:1234,
    },
    css: {
        devSourceMap:true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions:{
            input: {
                alta: resolve("views/alta.html"),
                carrito: resolve("views/carrito.html"),
                contacto: resolve("views/contacto.html"),
                mosotros: resolve("views/nosotros.html"),
                inicio: resolve("index.html"),

            }
        }
    }
}
console.log(resolve())
