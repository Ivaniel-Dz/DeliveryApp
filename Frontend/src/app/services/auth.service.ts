import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../interfaces/response-message';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Inyección de dependencias
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor() {}

  // Registrar un nuevo usuario
  register(data: Register): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/register`, data);
  }

  // Iniciar sesión
  login(data: Login): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/login`, data);
  }

  // Inicia sesión con Google
  loginWithGoogle(idToken: string): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.apiUrl}/loginGoogle`, {
      idToken,
    });
  }

}
