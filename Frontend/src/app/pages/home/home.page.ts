import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonBadge,
  IonContent,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';
import { count } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonBadge,
    IonContent,
    CommonModule,
    FormsModule,
    RouterModule
  ],
})
export class HomePage implements OnInit {
  // Inyección de Dependencias
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);

  // Variables
  categories: WritableSignal<Category[]> = signal([]);
  popularItems: Food[] = [];
  cartItemCount = 0;

  ngOnInit() {
    this.loadCategories();
    this.loadPopularItem();
    this.getCartItemCount();
  }

  // Cargar todas las categorías
  loadCategories() {
    this.foodService.getCategories().then((res) => this.categories.set(res));
  }

  // Cargar los items populares
  loadPopularItem() {
    // Para fines de prueba, solo cargaremos algunos artículos de hamburguesas
    this.foodService.getFoodsByCategory(1).then((items) => {
      this.popularItems = items.slice(0, 3); // solo toma los 3 primeros artículos
    });
  }

  getCartItemCount() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.reduce(
        (count, items) => count + items.quantity,
        0
      );
    });
  }

  // Ir a Categoría
  goToCategory(categoryId: number) {
    this.router.navigate(['/tabs/category', categoryId]);
  }

  // Ir a Detalles de comida
  goToFoodDetail(foodId: number) {
    this.router.navigate(['/tabs/detail', foodId]);
  }
}
