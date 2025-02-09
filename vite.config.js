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
        host: '0.0.0.0', // ✅ Bind to all interfaces
        port: parseInt(process.env.PORT) || 9000, // ✅ Match Railway's port
        cors: true,
        strictPort: true, // Prevent conflicts
        https: true,
    },
});
