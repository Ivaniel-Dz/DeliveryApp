import { Component, inject, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
private themeService = inject(ThemeService);
private alertController = inject(AlertController)

  async ngOnInit() {
    // DarkMode
    await this.themeService.loadUserPreference();

    // MediaQuery
    const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
    if (isDesktop) {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message:
          'Esta aplicación está optimizada para móviles. Te recomendamos abrirla desde tu teléfono. Puedes Cambiar el Modo Oscuro o Blanco en Configuración.',
        buttons: ['Entendido'],
      });

      await alert.present();
    }
    
  }
}
