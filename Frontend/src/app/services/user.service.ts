import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi, ResponseMessage } from '../interfaces/response';
import { User } from '../interfaces/user';
import { ChangePassword } from '../interfaces/change-password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Inyección de dependencias
  private apiUrl = `${environment.apiUrl}/user`;
  private http = inject(HttpClient);

  constructor() {}

  // Servicio para obtener los datos del usuario
  get(): Observable<ResponseApi<User>> {
    return this.http.get<ResponseApi<User>>(`${this.apiUrl}`);
  }

  // Servicio para actualizar usuario
  update(user: User): Observable<ResponseApi<User>> {
    return this.http.put<ResponseApi<User>>(
      `${this.apiUrl}/update`,
      user
    );
  }

  // Servicio para actualizar contraseña
  updatePassword(data: ChangePassword): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.apiUrl}/change-password`, data);
  }

  // Servicio para eliminar usuario
  delete(id: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.apiUrl}/delete/${id}`);
  }
  
}
