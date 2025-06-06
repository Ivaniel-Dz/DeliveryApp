import { AlertController, ToastController } from '@ionic/angular';

export class AlertUtils {
  constructor(
    private toastCtrl?: ToastController,
    private alertCtrl?: AlertController
  ) {}

  //  Alertas de Mensajes
  async showToast(
    message: string,
    options?: {
      color?: string;
      duration?: number;
      position?: 'top' | 'middle' | 'bottom';
    }
  ) {
    if (!this.toastCtrl) return;
    const toast = await this.toastCtrl.create({
      message,
      duration: options?.duration ?? 2000,
      color: options?.color ?? 'primary',
      position: options?.position ?? 'bottom',
    });
    await toast.present();
  }

  // Mensaje de confirmación
  async showConfirm(header: string, message: string, onConfirm: () => void) {
    if (!this.alertCtrl) return;
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aceptar', handler: () => onConfirm() },
      ],
    });
    await alert.present();
  }
}
