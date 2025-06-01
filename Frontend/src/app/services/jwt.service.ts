import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private readonly TOKEN_KEY = 'token';

  constructor() {}

  // Almacenar token con Preferences
  async setToken(token: string): Promise<void> {
    await Preferences.set({
      key: this.TOKEN_KEY,
      value: token,
    });
  }

  // Obtener token
  async getToken(): Promise<string | null> {
    const { value } = await Preferences.get({
      key: this.TOKEN_KEY,
    });
    return value;
  }

  // Decodificar token
  async decodeToken(): Promise<any | null> {
    const token = await this.getToken();
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Verificar la expiración del token
  async isTokenExpired(): Promise<boolean> {
    const decodedToken = await this.decodeToken();
    if (!decodedToken || !decodedToken.exp) return true;

    const expirationTime = decodedToken.exp * 1000;
    return Date.now() > expirationTime;
  }

  // Verificar si el usuario esta autenticado
  async isAuthenticated(): Promise<boolean> {
    return !(await this.isTokenExpired());
  }

  // Cerrar sesión, si expira el token
  async checkTokenExpiration(): Promise<void> {
    if (await this.isTokenExpired()) {
      await this.logout();
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    await Preferences.remove({ key: this.TOKEN_KEY});
  }

}
