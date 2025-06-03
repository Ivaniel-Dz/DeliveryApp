import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from '../../../interfaces/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonTitle, IonToolbar, IonHeader, IonIcon, IonLabel, IonList, IonButton, IonItem, IonAvatar, IonContent, IonText, CommonModule, FormsModule ],
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
