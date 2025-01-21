import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: 'localhost', // Use localhost to avoid [::1] issues
        cors: true,       // Enable CORS
        port: 5173,       // Ensure the port matches your `npm run dev`
    },
});
