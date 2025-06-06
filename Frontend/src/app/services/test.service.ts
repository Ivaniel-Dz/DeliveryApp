import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

// Variables de Ionic Storage
const ORDERS_KEY = 'demo-orders';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor() {}

  // Servicio para Delivery
  async getOrders(): Promise<any[]> {
    const { value } = await Preferences.get({ key: ORDERS_KEY });
    return value ? JSON.parse(value) : [];
  }

  async addOrder(order: any): Promise<void> {
    const orders = await this.getOrders();
    orders.unshift(order); // Agrega al inicio
    await Preferences.set({ key: ORDERS_KEY, value: JSON.stringify(orders) });
  }

  async clearOrders(): Promise<void> {
    await Preferences.remove({ key: ORDERS_KEY });
  }
}
