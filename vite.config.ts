import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({
            insertTypesEntry: true,
            include: ['src/**/*'],
            exclude: ['src/**/*.test.ts', 'src/**/*.spec.ts']
        })
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'CkhBookingEngine',
            fileName: (format) => {
                switch (format) {
                    case 'es':
                        return 'ckh-booking-engine.es.js'
                    case 'cjs':
                        return 'ckh-booking-engine.cjs.js'
                    case 'umd':
                        return 'ckh-booking-engine.umd.js'
                    case 'amd':
                        return 'ckh-booking-engine.amd.js'
                    default:
                        return `ckh-booking-engine.${format}.js`
                }
            },
            formats: ['es', 'cjs', 'umd', 'amd']
        },
        rollupOptions: {
            // Make sure to externalize deps that shouldn't be bundled
            external: [],
            output: {
                // Provide global variables to use in the UMD build
                globals: {},
                exports: 'named'
            }
        },
        // Generate source maps for debugging
        sourcemap: true,
        // Minimize output
        minify: 'terser'
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    // Development server configuration
    server: {
        port: 3000,
        open: true
    }
})