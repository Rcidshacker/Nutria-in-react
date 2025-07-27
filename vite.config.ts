// vite.config.ts

import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        server: {
            proxy: {
                '/api/v1': {
                    target: 'http://127.0.0.1:8000',
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        plugins: [react()],
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
    };
});