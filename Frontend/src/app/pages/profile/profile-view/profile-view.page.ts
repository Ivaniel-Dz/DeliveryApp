import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ProfileViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private userService = inject(UserService);
  user: User | null = null;

  // Mostrar los datos del perfil
  async ngOnInit() {
    this.user = await this.userService.getUser();
  }

  //
  async ionViewWillEnter() {
    this.user = await this.userService.getUser();
  }

  // Ir a form de edición
  goToEditProfile() {
    this.router.navigate(['/tabs/profile/edit']);
  }

  // ir a Historial de pedidos
  goToOrderHistory() {
    this.router.navigate(['/tabs/delivery/history']);
  }

  // Ir a dirección de pedidos
  goToDeliveryAddresses() {
    this.router.navigate(['/tabs/delivery/addresses']);
  }

  // Ir a configuración
  goToSettings() {
    this.router.navigate(['tabs/settings']);
  }

  goToHistory() {
    this.router.navigate(['tabs/delivery/order-history']);
  }

  goToAddress() {
    this.router.navigate(['tabs/delivery/address']);
  }

  // Método para cerrar sección
  logout() {
    this.router.navigate(['/login']);
  }
}
