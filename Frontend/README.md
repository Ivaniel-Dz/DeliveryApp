# Delivery: Frontend

## Tecnologías usadas en el Proyecto
- Angular v19
- Ionic Framework v8
- Capacitor v7

## Capacitor Plugins
### Preferences
```bash
npm install @capacitor/preferences
npx cap sync
```

### Cámara
```bash
npm install @capacitor/camera
npx cap sync
```

## Librerías/paquetes de Angular
### jwt
```bash
npm i jwt-decode
```

### OAuth Google: capacitor v6 (No compatible con v7)
```bash
npm install @codetrix-studio/capacitor-google-auth
npx cap sync
```

- Configuración en ``capacitor.config.ts``
```bash
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuapp.delivery',
  appName: 'DeliveryApp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'TU_SERVER_CLIENT_ID_DE_GOOGLE',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
```

- Si trabajas en navegador (modo web): 
    - En ``main.ts`` añade:
```bash
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

GoogleAuth.initialize({
  clientId: 'TU_CLIENT_ID_WEB.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true
});
```

### Google Identity Services para app web ``Ionic`` + ``Angular`` (compatible con ``Capacitor 7``)
```bash
npm install @abacritt/angularx-social-login
```