# 🚀 **Delivery App: Frontend**

## 🧰 **Tecnologías Usadas**

* ⚡ **Angular v19**
* 📱 **Ionic Framework v8**
* 🔌 **Capacitor v7**

---

## 🔌 **Plugins de Capacitor**

### 🧠 Preferences

> Almacenamiento local de preferencias clave-valor

```bash
npm install @capacitor/preferences
npx cap sync
```

### 📷 Cámara

> Acceso a la cámara del dispositivo

```bash
npm install @capacitor/camera
npx cap sync
```

---

## 📦 **Librerías/Paquetes de Angular**

### 🛡️ JWT Decode

> Decodifica tokens JWT

```bash
npm i jwt-decode
```

---

## 🔐 **Autenticación con Google OAuth**

### 🌐 Versión *Dispositivo* (No Web)

> Implementado usando `@capgo/capacitor-social-login`

```bash
npm install @capgo/capacitor-social-login
npx cap sync
```

---

## ⚙️ **Configuración del Plugin**

```ts
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

---

## 🧪 **Ejemplo del Servicio `AuthGoogleService`**

```ts
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

      if (result.result.responseType === 'online') {
        const idToken = result.result.idToken;
        console.log('ID Token:', idToken);
        return idToken ?? null;
      } else {
        console.error('❌ El inicio de sesión no retornó un idToken.');
        return null;
      }
    } catch (error) {
      console.error('❌ Error al iniciar sesión con Google:', error);
      return null;
    }
  }

  async logout(): Promise<void> {
    try {
      await SocialLogin.logout({ provider: 'google' });
    } catch (error) {
      console.error('❌ Error al cerrar sesión:', error);
    }
  }
}
```

---

## 📲 **Uso del Servicio en una Página (`login.page.ts`)**

```ts
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

---

## 🌐 **OAuth Google (Versión Web)**

> ⚠️ *Sección pendiente de completar. Puedes implementar esta funcionalidad usando `angular-oauth2-oidc` u otras librerías compatibles con Angular Web.*

---

