import { CommonModule } from '@angular/common';
// prettier-ignore
import { Component, inject, OnInit, signal, WritableSignal,} from '@angular/core';
import { Router } from '@angular/router';
// prettier-ignore
import { IonContent, IonList, IonThumbnail } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { Category } from '../../../interfaces/category';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.page.html',
  styleUrls: ['./food-category.page.scss'],
  standalone: true,
  imports: [IonList, IonContent, IonThumbnail, CommonModule, HeaderComponent],
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
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/food', categoryId]);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }

  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/home']);
  }
}
