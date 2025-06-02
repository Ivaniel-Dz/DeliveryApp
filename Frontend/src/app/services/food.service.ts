import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Food } from '../interfaces/food';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  // Inyección de dependencias
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/food`;

  // Método obtener toda las comidas de la lista
  getAllFood(): Observable<Food[]> {
    return this.http.get<Food[]>(`${this.apiUrl}`);
  }

  // Método para obtener una comida
  getFoodById(id: number): Observable<Food> {
    return this.http.get<Food>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener las comidas más populares
  async getPopularFoods(limit: number = 5): Promise<Food[]> {
    const allFoods = await firstValueFrom(this.getAllFood());
    return allFoods
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, limit);
  }

}
