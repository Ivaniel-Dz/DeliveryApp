import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
// prettier-ignore
import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonToggle } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { CartService } from '../../../services/cart.service';
import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.page.html',
  styleUrls: ['./settings-view.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [IonLabel, IonIcon, IonItem, IonList, IonListHeader, IonContent, IonToggle, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent ],
})
export class SettingsViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private themeService = inject(ThemeService);
  private userService = inject(UserService);
  private cartService = inject(CartService);
  paletteToggle = false;
  title = 'Configuración';

  async ngOnInit() {
    const isDark = await this.themeService.getDarkMode();
    this.paletteToggle = isDark;
    this.themeService.setDarkMode(isDark);
  }

  toggleChange(event: CustomEvent) {
    const checked = event.detail.checked;
    this.paletteToggle = checked;
    this.themeService.setDarkMode(checked);
  }

  // Ir al form de cambio de contraseña
  goToChangePassword() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/settings/change-password']);
  }

  // Mensaje de Confirmación
  async confirmDeleteAccount() {
    this.userService.resetUser();
    this.cartService.clearCart();
    const alert = await this.alertController.create({
      header: 'Eliminar Cuenta',
      message:
        '¿Estas seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.deleteAccount();
          },
        },
      ],
    });

    await alert.present();
  }

  // Método para Eliminar Cuenta
  async deleteAccount() {
    // alerta
    const toast = await this.toastController.create({
      message: 'Cuenta eliminada correctamente.',
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();

    //Service de auth: logout
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/login']);
  }

  // Regresar a la pagina anterior
  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile']);
  }
}
