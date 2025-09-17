declare module '*.css';
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // You can add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}