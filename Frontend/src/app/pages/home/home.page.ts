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
import { IonicModule } from '@ionic/angular';
import { FoodService } from '../../services/food.service';
import { CartService } from '../../services/cart.service';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class HomePage implements OnInit {
  // Inyección de Dependencias
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);

  // Variables
  categories: WritableSignal<Category[]> = signal([]);
  popularItems: Food[] = [];
  cartItemCount: number = 0;

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

  // Obtener el numero item del carrito
  getCartItemCount() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItemCount = items.reduce(
        (count, items) => count + items.quantity,
        0
      );
    });
  }

  // Ir a la lista de Categoría
  goToCategory() {
    this.router.navigate(['/tabs/food/category']);
  }

  // Ir a las comidas por categoría
  goToFoodCategory(categoryId: number) {
    this.router.navigate(['/tabs/food', categoryId]);
  }

  // Ir a Detalles de comida
  goToFoodDetail(id: number) {
    this.router.navigate(['/tabs/food/detail', id]);
  }

  // Agregar producto al carrito
  addCartItem(food: Food) {
    this.cartService.addFoodItem(food);
    this.router.navigate(['/tabs/cart']);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
}
