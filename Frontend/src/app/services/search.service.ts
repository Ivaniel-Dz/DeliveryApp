import { inject, Injectable } from '@angular/core';
import { FoodService } from './food.service';
import { Food } from '../interfaces/food';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Inyección del servicio
  private foodService = inject(FoodService)

  // Método para buscar comidas
  async searchFoods(query: string): Promise<Food[]> {
    const allFoods = await this.foodService.getAllFoods();
    const lowerQuery = query.toLowerCase();
    return allFoods.filter((food) => {
      const matchName = food.name.toLowerCase().includes(lowerQuery);
      const matchIngredients = food.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(lowerQuery)
      );
      return matchName || matchIngredients;
    });
  }

}
