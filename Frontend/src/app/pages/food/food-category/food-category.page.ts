import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Category } from '../../../interfaces/category';
import { FoodService } from '../../../services/food.service';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.page.html',
  styleUrls: ['./food-category.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, HeaderComponent],
})
export class FoodCategoryPage implements OnInit {
  // Inyección de Dependencias
  private foodService = inject(FoodService);
  private router = inject(Router);
  // Variables
  categories: WritableSignal<Category[]> = signal([]);
  title = 'Categorías';

  ngOnInit(): void {
    this.loadCategories();
  }

  // Cargar todas las categorías
  loadCategories() {
    this.foodService.getCategories().then((res) => this.categories.set(res));
  }

  // Ir a las comidas por categoría
  goToFoodCategory(categoryId: number) {
    this.router.navigate(['/tabs/food', categoryId]);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
  
}
