import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonText, IonTitle, IonToolbar, AlertController, ToastController } from '@ionic/angular/standalone';
import { UserService } from '../../../services/user.service';
import { JwtService } from '../../../services/jwt.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonLabel, IonIcon, IonList, IonButton, IonText, IonAvatar, IonItem, IonContent, IonTitle, IonToolbar, IonHeader, CommonModule, FormsModule, ],
})
export class ProfileViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private userService = inject(UserService);
  private jwtService = inject(JwtService);
  user: any = {};

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.get().subscribe({
      next: (resp) => {
        this.user = resp.response; // user = response<User>
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
      },
    });
  }

  // Ir a form de edición
  goToEditProfile() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile/edit']);
  }

  // ir a Historial de pedidos
  goToOrderHistory() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/delivery/order-history']);
  }

  // Ir a dirección de pedidos
  goToDeliveryAddress() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/delivery/address']);
  }

  // Ir a configuración
  goToSettings() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['tabs/settings']);
  }

  // Mensaje de confirmación
  async confirmCloseSession() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro que quiere cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          cssClass: 'danger',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para cerrar sección
  logout() {
    // Alerta de confirmación
    this.presentToast('Sesión cerrada correctamente');

    this.jwtService.logout();
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/login']);
  }

  // Método de alerta de toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }

}
