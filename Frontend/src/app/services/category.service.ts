import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  // Inyección de dependencias
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/category`;

  constructor() {}

  // Servicio para obtener todas las categorías
  getList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  // Servicio para obtener comida por categoría
  getById(id: number): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}/${id}`);
  }
  
}
