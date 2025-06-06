import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class AlertUIService {
  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  // Mensaje de confirmación
  async showConfirm(
    header: string,
    message: string,
    confirmText: string = 'Aceptar',
    cancelText: string = 'Cancelar',
    confirmHandler?: () => void
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
        },
        {
          text: confirmText,
          cssClass: 'danger',
          handler: confirmHandler,
        },
      ],
    });

    await alert.present();
  }

  // Mensaje
  async showToast(
    message: string,
    duration: number = 2000,
    color: 'success' | 'warning' | 'danger' | 'primary' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
  
}
