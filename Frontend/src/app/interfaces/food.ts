import { Ingredient } from './ingredient';

export interface Food {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  calories: number;
  preparationTime: string;
  ingredients: Ingredient[];
}
