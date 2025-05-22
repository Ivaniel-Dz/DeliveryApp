import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  imports: [CommonModule, IonicModule],
})
export class OrderHistoryPage {
  private router = inject(Router);

  orders = [
    {
      id: 'ORD-001',
      date: new Date(2023, 5, 15, 19, 30),
      total: 24.98,
      status: 'delivered',
      items: [
        { name: 'Hamburguesa Clásica', quantity: 1, price: 8.99 },
        { name: 'Pizza Margherita', quantity: 1, price: 12.99 },
        { name: 'Refresco', quantity: 1, price: 2.99 },
      ],
    },
    {
      id: 'ORD-002',
      date: new Date(2023, 5, 10, 13, 45),
      total: 18.98,
      status: 'delivered',
      items: [
        { name: 'Tacos al Pastor', quantity: 2, price: 7.99 },
        { name: 'Jugo Natural', quantity: 1, price: 2.99 },
      ],
    },
    {
      id: 'ORD-003',
      date: new Date(2023, 5, 5, 20, 15),
      total: 32.97,
      status: 'delivered',
      items: [
        { name: 'Pizza Pepperoni', quantity: 1, price: 14.99 },
        { name: 'Hamburguesa con Queso', quantity: 1, price: 9.99 },
        { name: 'Helado', quantity: 1, price: 4.99 },
        { name: 'Refresco', quantity: 1, price: 2.99 },
      ],
    },
    {
      id: 'ORD-004',
      date: new Date(),
      total: 21.98,
      status: 'in-progress',
      items: [
        { name: 'Hamburguesa Doble', quantity: 1, price: 12.99 },
        { name: 'Ensalada César', quantity: 1, price: 7.99 },
      ],
    },
  ];

  selectedOrder: any = null;

  viewOrderDetails(order: any) {
    this.selectedOrder = order;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'delivered':
        return 'Entregado';
      case 'in-progress':
        return 'En Proceso';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }
}
