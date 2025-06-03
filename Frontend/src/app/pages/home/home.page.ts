import { CommonModule } from '@angular/common';
// prettier-ignore
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
// prettier-ignore
import { IonBadge, IonContent, IonIcon, IonText } from "@ionic/angular/standalone";
import { BannerComponent } from '../../components/banner/banner.component';
import { CardCategoryComponent } from '../../components/card-category/card-category.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { Category } from '../../interfaces/category';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonIcon, IonBadge, IonText, IonContent, CommonModule, FormsModule, RouterModule, BannerComponent, CardCategoryComponent, ListItemComponent ],
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
  paletteToggle = false;

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
    this.router.navigate(['/tabs/cart']);
  }

  // redirige a pagina de Categoría
  goToCategory() {
    this.router.navigate(['/tabs/food/category']);
  }

  // redirige a pagina de lista de populares
  goToPopularFood() {
    this.router.navigate(['/tabs/food/popular']);
  }
}
