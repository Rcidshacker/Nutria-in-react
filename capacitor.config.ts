// File: nutria-health-app/capacitor.config.ts

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.nutria.healthapp',
  appName: 'Nutria',
  webDir: 'dist',
  // --- ADD THIS SERVER BLOCK ---
  server: {
    androidScheme: 'http' // Use http to avoid mixed content errors
  }
  // -----------------------------
};

export default config;