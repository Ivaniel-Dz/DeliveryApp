import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, IonThumbnail } from '@ionic/angular/standalone';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss'],
  imports: [IonList, IonThumbnail, CommonModule],
})
export class CardCategoryComponent {
  // Inyección de Dependencias
  private router = inject(Router);

  // Variables
  @Input() category!: Category;

  // Ir a las comidas por categoría
  goToFoodCategory(categoryId: number) {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/food', categoryId]);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
}
