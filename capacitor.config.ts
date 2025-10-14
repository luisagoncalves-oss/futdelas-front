import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.luisag.futdelas',
  appName: 'futdelas',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: [
      'https://futdelas-api.onrender.com',
      '*.onrender.com'
    ]
  }
};
export default config;
