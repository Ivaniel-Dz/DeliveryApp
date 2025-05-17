import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.page.html',
  styleUrls: ['./settings-view.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class SettingsViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private navCtrl = inject(NavController);
  private themeService = inject(ThemeService);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  darkMode = false;

  ngOnInit() {
    this.themeService.isDarkMode().subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  // Cambio de temas
  toggleDarkMode(event: CustomEvent) {
    const isDark = event.detail.checked;
    this.themeService.setDarkMode(isDark);
  }

  // Ir al form de cambio de contraseña
  goToChangePassword() {
    this.router.navigate(['/tabs/settings/change-password']);
  }

  // Mensaje de Confirmación
  async confirmDeleteAccount() {
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
    this.router.navigate(['/login']);
  }

  // Regresar a la pagina anterior
  goBack() {
    this.navCtrl.back();
  }
}
