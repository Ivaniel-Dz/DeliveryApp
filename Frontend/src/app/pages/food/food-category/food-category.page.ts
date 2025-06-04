import { Component, inject, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonThumbnail } from '@ionic/angular/standalone';
import { Category } from '../../../interfaces/category';
import { HeaderComponent } from '../../../components/header/header.component';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-food-category',
  templateUrl: './food-category.page.html',
  styleUrls: ['./food-category.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, IonContent, IonList, IonThumbnail],
})
export class FoodCategoryPage implements OnInit {
  // Inyección de Dependencias
  private categoryService = inject(CategoryService);
  private router = inject(Router);
  // Variables
  categories: Category[] = [];
  title = 'Categorías';

  ngOnInit(): void {
    this.loadCategories();
  }

  // Cargar todas las categorías
  loadCategories(): void {
    this.categoryService.getList().subscribe({
      next: (res) => {
        this.categories = res;
      },
      error: (err) => {
        console.error('Error al cargar las categorías:', err);
      },
    });
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
