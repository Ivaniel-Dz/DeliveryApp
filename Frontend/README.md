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

### OAuth Google:
```bash
npm install @capgo/capacitor-social-login
npx cap sync
```

### ⚙️ Configuración
```bash
const config: CapacitorConfig = {
  plugins: {
    SocialLogin: {
      providers: {
        google: {
          clientId: 'TU_CLIENT_ID_DE_GOOGLE',
          scopes: ['profile', 'email']
        }
      }
    }
  }
};
```

### Ejemplo del servicio AuthGoogleService:
```bash
import { Injectable } from '@angular/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  async loginWithGoogle(): Promise<string | null> {
    try {
      const result = await SocialLogin.login({
        provider: 'google',
        options: {
          scopes: ['email', 'profile'],
        },
      });

      // Verificar que la respuesta sea del tipo 'online'
      if (result.result.responseType === 'online') {
        const idToken = result.result.idToken;
        console.log('ID Token:', idToken);
        return idToken ?? null;
      } else {
        console.error('El inicio de sesión no retornó un idToken.');
        return null;
      }
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await SocialLogin.logout({ provider: 'google' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
```

### Usar el servicio en una página, por ejemplo en login.page.ts
```bash
import { Component } from '@angular/core';
import { AuthGoogleService } from '../services/auth-google.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  constructor(
    private googleAuth: AuthGoogleService,
    private http: HttpClient
  ) {}

  async loginConGoogle() {
    const idToken = await this.googleAuth.loginWithGoogle();

    if (idToken) {
      // 👉 Enviar al backend
      this.http.post('https://localhost:44308/api/Auth/LoginWithGoogle', { idToken })
        .subscribe({
          next: (response) => {
            console.log('✅ Backend response:', response);
            // Guardar el JWT del backend aquí
          },
          error: (err) => {
            console.error('❌ Error en el backend:', err);
          }
        });
    }
  }
}
```