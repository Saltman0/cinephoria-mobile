import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'cinephoria-mobile',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;
