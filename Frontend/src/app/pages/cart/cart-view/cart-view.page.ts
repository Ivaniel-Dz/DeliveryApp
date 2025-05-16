import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CartItem } from '../../../interfaces/cart-item';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.page.html',
  styleUrls: ['./cart-view.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class CartViewPage implements OnInit {
  // Inyección del servicio
  private cartService = inject(CartService);
  // Variables
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 2.99;
  total = 0;

  ngOnInit() {
    this.loadCartItems();
  }

  // Carga los items del carrito
  loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      console.log(this.cartItems); // testing
      this.calculateTotals();
    });
  }

  // Calcula el total
  calculateTotals() {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.price + item.quantity,
      0
    );
    this.total = this.subtotal + this.deliveryFee;
  }

  // Incrementa la cantidad de item
  incrementQuantity(itemId: number) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  // decremento la cantidad de item
  decrementQuantity(itemId: number) {
    const item = this.cartItems.find((i) => i.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  // Quitar item del carrito
  removeItem(itemId: number) {
    this.cartService.removeItem(itemId);
  }

  // Probar el carrito
  checkout() {
    console.log('Procedimiento al pago con artículos: ', this.cartItems);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
}
