import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CartItem } from '../../interfaces/cart-item';
import { CartService } from '../../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule,  IonicModule, RouterModule],
})
export class CartPage implements OnInit {
  // Inyección del servicio
  private cartService = inject(CartService);
  // Variables
  cartItem: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 2.99;
  total = 0;

  ngOnInit() {
    this.loadCartItems();
  }

  // Carga los items del carrito
  loadCartItems() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItem = items;
      this.calculateTotals();
    });
  }

  // Calcula el total
  calculateTotals() {
    this.subtotal = this.cartItem.reduce(
      (sum, item) => sum + item.price + item.quantity,
      0
    );
    this.total = this.subtotal + this.deliveryFee;
  }

  // Incrementa la cantidad de item
  incrementQuantity(itemId: string) {
    const item = this.cartItem.find((i) => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  // decremento la cantidad de item
  decrementQuantity(itemId: string) {
    const item = this.cartItem.find((i) => i.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  // Quitar item del carrito
  removeItem(itemId: string) {
    this.cartService.removeItem(itemId);
  }

  // Probar el carrito
  checkout() {
    console.log('Procedimiento al pago con artículos: ', this.cartItem);
  }
}
