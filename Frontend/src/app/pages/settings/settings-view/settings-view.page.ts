import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonicModule,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.page.html',
  styleUrls: ['./settings-view.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, HeaderComponent],
})
export class SettingsViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private navCtrl = inject(NavController);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private themeService = inject(ThemeService);
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
