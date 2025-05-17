import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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

  ngOnInit() {}

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

  // Método para cerrar sección
  logout() {
    this.router.navigate(['/login']);
  }
}
