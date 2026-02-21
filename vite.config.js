import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'stitch_website/index.html'),
                about: resolve(__dirname, 'stitch_website/about.html'),
                contact: resolve(__dirname, 'stitch_website/contact.html'),
                global: resolve(__dirname, 'stitch_website/global_companies.html'),
                indian: resolve(__dirname, 'stitch_website/indian_businesses.html'),
                how: resolve(__dirname, 'stitch_website/how_we_work.html')
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
})
