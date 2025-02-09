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
        host: '0.0.0.0', // Bind to all interfaces (Fix for Render)
        port: process.env.PORT || 5173, // Use Render’s PORT environment variable
        cors: true, // Enable CORS for API calls
        strictPort: true, // Avoid port conflicts
    },
});
