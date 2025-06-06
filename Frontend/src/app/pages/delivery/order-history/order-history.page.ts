import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// prettier-ignore
import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TestService } from '../../../services/test.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonBadge, IonContent, IonTitle, IonIcon, IonButtons, IonButton, IonToolbar, IonHeader, CommonModule ],
})
export class OrderHistoryPage implements OnInit {
  private router = inject(Router);
   private testService = inject(TestService);

  // Ejemplos fijos
  exampleOrders = [
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
  ];

  orders: any[] = [];
  selectedOrder: any = null;

  async ngOnInit() {
    await this.loadOrders();
  }

  async ionViewWillEnter() {
    await this.loadOrders();
  }

  async loadOrders() {
    const userOrders = await this.testService.getOrders();
    // Combina los ejemplos con los pedidos reales (primero los nuevos)
    this.orders = [...userOrders, ...this.exampleOrders];
  }

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
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile']);
  }
}
