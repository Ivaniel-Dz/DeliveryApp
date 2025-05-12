import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../interfaces/cart-item';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Variables
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  private readonly CART_KEY = 'cart';

  constructor() {
    this.loadCartFromStorage();
  }

  // Obtener los items del carrito
  getCartItems(): Observable<CartItem[]> {
    return this.cartItems.asObservable();
  }

  // Agregar los items a carrito
  async addToCart(item: CartItem): Promise<void> {
    const currentItems = [...this.cartItems.value];
    const existingItemIndex = currentItems.findIndex((i) => i.id === item.id);

    if (existingItemIndex !== -1) {
      currentItems[existingItemIndex].quantity += item.quantity;
    } else {
      currentItems.push(item);
    }

    this.cartItems.next(currentItems);
    await this.saveCartToStorage();
  }

  // Actualizar la cantidad de items
  async updateQuantity(itemId: string, quantity: number): Promise<void> {
    const currentItems = [...this.cartItems.value];
    const itemIndex = currentItems.findIndex((i) => i.id === itemId);

    if (itemIndex !== -1) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItems.next(currentItems);
      await this.saveCartToStorage();
    }
  }

  // Remover un items
  async removeItem(itemId: string): Promise<void> {
    const updatedItems = this.cartItems.value.filter((i) => i.id !== itemId);
    this.cartItems.next(updatedItems);
    await this.saveCartToStorage();
  }

  // Limpiar carrito
  async clearCart(): Promise<void> {
    this.cartItems.next([]);
    await Preferences.remove({ key: this.CART_KEY });
  }

  // Obtener el total de los productos
  getCartTotal(): Observable<number> {
    return new Observable<number>((observer) => {
      this.cartItems.subscribe((items) => {
        const total = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        observer.next(total);
      });
    });
  }

  // Guardar el carrito
  private async saveCartToStorage(): Promise<void> {
    await Preferences.set({
      key: this.CART_KEY,
      value: JSON.stringify(this.cartItems.value),
    });
  }

  // Cargar todo la memoria
  private async loadCartFromStorage(): Promise<void> {
    const result = await Preferences.get({ key: this.CART_KEY });
    if (result.value) {
      this.cartItems.next(JSON.parse(result.value));
    }
  }
}
