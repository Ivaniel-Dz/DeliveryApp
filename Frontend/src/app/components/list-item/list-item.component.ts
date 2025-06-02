import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonIcon,
  IonList,
  IonThumbnail,
} from '@ionic/angular/standalone';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  imports: [IonButton, IonIcon, IonList, IonThumbnail, CommonModule],
})
export class ListItemComponent {
  private router = inject(Router);
  private cartService = inject(CartService);
  @Input() item!: Food;

  // Ir a Detalles de la comida
  goToFoodDetail(id: number) {
    this.router.navigate(['/tabs/food/detail', id]);
  }

  // Agregar producto al carrito
  addCartItem(food: Food) {
    this.cartService.addFoodItem(food);
    this.router.navigate(['/tabs/cart']);
  }

  onImageError(event: any) {
    event.target.src = 'assets/placeholder/foods.webp';
  }
}
