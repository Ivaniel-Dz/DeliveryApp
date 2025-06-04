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
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile/edit']);
  }

  // ir a Historial de pedidos
  goToOrderHistory() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/delivery/history']);
  }

  // Ir a dirección de pedidos
  goToDeliveryAddresses() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/delivery/addresses']);
  }

  // Ir a configuración
  goToSettings() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['tabs/settings']);
  }

  // Método para cerrar sección
  logout() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/login']);
  }
}
