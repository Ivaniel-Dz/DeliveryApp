import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class CategoryPage implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);
  // Variables
  categoryId!: number;
  categoryName = '';
  foodItems: Food[] = [];

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCategoryData();
  }

  // Carga las comidas por categoría
  async loadCategoryData() {
    // Obtener categorías
    const categories = await this.foodService.getCategories();
    const category = categories.find((c) => c.id === this.categoryId);

    if (category) {
      this.categoryName = category.name;
    }

    // Obtener productos por categoría
    this.foodItems = await this.foodService.getFoodsByCategory(this.categoryId);
  }

  // Regresar a home
  goBack() {
    this.router.navigate(['/tabs/home']);
  }

  // Ir a Detalles de la comida
  goToFoodDetail(foodId: number) {
    this.router.navigate(['/tabs/detail', foodId]);
  }

  // Agregar producto al carrito
  addCartItem(food: Food) {
    this.cartService.addFoodItem(food);
    this.router.navigate(['/tabs/cart']);
  }
  
}
