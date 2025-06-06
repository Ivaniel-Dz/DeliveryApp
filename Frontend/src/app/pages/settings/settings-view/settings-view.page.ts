import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonContent, IonToggle ,IonIcon, IonItem, IonLabel, IonList, IonListHeader, AlertController, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { ThemeService } from '../../../services/theme.service';
import { UserService } from '../../../services/user.service';
import { JwtService } from '../../../services/jwt.service';
import { AlertUtils } from '../../../utils/alert.util';

@Component({
  selector: 'app-settings-view',
  templateUrl: './settings-view.page.html',
  styleUrls: ['./settings-view.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonLabel, IonToggle, IonIcon, IonItem, IonList, IonListHeader, IonContent, CommonModule, FormsModule, ReactiveFormsModule, HeaderComponent ],
})
export class SettingsViewPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  private themeService = inject(ThemeService);
  private useService = inject(UserService);
  private jwtService = inject(JwtService);
  // Variables
  alertUtils = new AlertUtils(this.toastController, this.alertController);
  user: any = {};
  paletteToggle = false;
  title = 'Configuración';

  async ngOnInit() {
    const isDark = await this.themeService.getDarkMode();
    this.paletteToggle = isDark;
    this.themeService.setDarkMode(isDark);
    this.loadUser();
  }

  // Carga los datos del usuario
  loadUser() {
    this.useService.get().subscribe({
      next: (resp) => {
        if (resp) {
          this.user = resp.response;
        }
      },
      error: (err) => {
        console.error('Error al obtener el usuario', err);
      },
    });
  }

  // Cambiar el modo oscuro
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
    await this.alertUtils.showConfirm(
      'Eliminar Cuenta',
      '¿Estas seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer.',
      () => this.deleteAccount()
    );
  }

  // Método para Eliminar Cuenta
  async deleteAccount() {
    if (!this.user || !this.user.id) {
      console.error('Usuario no cargado');
      return;
    }

    this.useService.delete(this.user.id).subscribe({
      next: async (resp) => {
        if (resp.isSuccess) {
          // Alerta
          await this.alertUtils.showToast('Cuenta eliminada correctamente', {
            color: 'success',
          });

          this.jwtService.logout();
          (document.activeElement as HTMLElement)?.blur();
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error al eliminar la cuenta', err);
      },
    });
  }

  // Regresar a la pagina anterior
  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile']);
  }
}
