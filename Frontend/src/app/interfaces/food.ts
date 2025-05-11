export interface Food {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  ingredients: string[];
  calories: number;
  preparationTime: string;
}
