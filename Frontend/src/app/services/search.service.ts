import { inject, Injectable } from '@angular/core';
import { FoodService } from './food.service';
import { Food } from '../interfaces/food';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Inyección del servicio
  private foodService = inject(FoodService);

  // Método para buscar comidas
  async searchFoods(query: string): Promise<Food[]> {
    const allFoods = await firstValueFrom(this.foodService.getAllFood());
    const lowerQuery = query.toLowerCase();

    return allFoods.filter((food) => {
      const matchName = food.name.toLowerCase().includes(lowerQuery);
      const matchIngredients = Array.isArray(food.ingredients)
        ? food.ingredients.some((ingredient: any) =>
            (ingredient.name || ingredient).toLowerCase().includes(lowerQuery)
          )
        : false;

      return matchName || matchIngredients;
    });
  }

}
