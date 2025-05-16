import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  private dbUrl = 'assets/data/database.json';

  // Método para obtener las categorías
  async getCategories(): Promise<Category[]> {
    const res = await fetch(this.dbUrl);
    const data = await res.json();
    return data.categories;
  }

  // Método obtener toda las comidas de la lista
  async getAllFoods(): Promise<Food[]> {
    const res = await fetch(this.dbUrl);
    const data = await res.json();
    return data.foods;
  }

  // Método obtener la comida por categoría
  async getFoodsByCategory(categoryId: number): Promise<Food[]> {
    const allFoods = await this.getAllFoods();
    return allFoods.filter((food) => food.categoryId == categoryId);
  }

  // Método para obtener una comida
  async getFoodById(foodId: number): Promise<Food | undefined> {
    const allFoods = await this.getAllFoods();
    return allFoods.find((food) => food.id === foodId);
  }

  // Método para obtener las comidas más populares
  async getPopularFoods(limit: number): Promise<Food[]> {
    const allFoods = await this.getAllFoods();
    // Ordena por rating descendente y toma los primeros 'limit'
    return allFoods.sort((a, b) => b.rating - a.rating).slice(0, limit);
  }

}
