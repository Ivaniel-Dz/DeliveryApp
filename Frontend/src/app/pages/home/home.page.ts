import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonIcon, IonText, IonBadge } from '@ionic/angular/standalone';
import { BannerComponent } from '../../components/banner/banner.component';
import { CardCategoryComponent } from '../../components/card-category/card-category.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ CommonModule, FormsModule, RouterModule, BannerComponent, CardCategoryComponent, ListItemComponent, IonContent, IonIcon, IonText, IonBadge,],
})
export class HomePage implements OnInit {
  // Inyección de Dependencias
  private router = inject(Router);
  private foodService = inject(FoodService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);

  // Variables
  categories: Category[] = [];
  popularItems: Food[] = [];
  cartItemCount: number = 0;
  paletteToggle = false;

  ngOnInit(): void {
    this.loadCategories();
    this.loadPopularItem();
    this.getCartItemCount();
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

  // Cargar los items populares
  loadPopularItem() {
    this.foodService.getPopularFoods(3).then((items) => {
      this.popularItems = items;
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

  // redirige a pagina de carrito
  goToCard() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/cart']);
  }

  // redirige a pagina de Categoría
  goToCategory() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/food/category']);
  }

  // redirige a pagina de lista de populares
  goToPopularFood() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/food/popular']);
  }
}
