import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                contact: resolve(__dirname, 'contact.html'),
                global: resolve(__dirname, 'global_companies.html'),
                indian: resolve(__dirname, 'indian_businesses.html'),
                how: resolve(__dirname, 'how_we_work.html')
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
})
