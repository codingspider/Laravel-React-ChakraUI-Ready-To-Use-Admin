import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/src/App.jsx'],
            refresh: true,
        }),
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'Offline App',
                short_name: 'OfflineApp',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#2563eb',
                icons: [
                    { src: '/icons/192.png', sizes: '192x192', type: 'image/png' },
                    { src: '/icons/512.png', sizes: '512x512', type: 'image/png' }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,svg,ico,json}'],
            },
        }),
    ],
});
