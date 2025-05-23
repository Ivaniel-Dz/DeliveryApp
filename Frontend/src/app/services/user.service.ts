import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { User } from '../interfaces/user';

const USER_KEY = 'demo-user';
const ORDERS_KEY = 'demo-orders';

const DEFAULT_USER: User = {
  id: 1,
  name: 'Ivan Diaz',
  email: 'demo@domain.com',
  phone: '+1234567890',
  address: 'Calle Ficticia 123',
  picture: 'assets/placeholder/avatar.svg',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  // Servicio de usuario
  async getUser(): Promise<User> {
    const { value } = await Preferences.get({ key: USER_KEY });
    return value ? JSON.parse(value) : DEFAULT_USER;
  }

  async saveUser(user: User): Promise<void> {
    await Preferences.set({ key: USER_KEY, value: JSON.stringify(user) });
  }

  async resetUser(): Promise<void> {
    await Preferences.clear();
  }

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
