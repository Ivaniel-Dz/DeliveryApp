import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private themeService: ThemeService) {}

  async ngOnInit() {
    // DarkMode
    await this.themeService.loadUserPreference();

    // MediaQuery
    const isDesktop = window.innerWidth > 768 && !('ontouchstart' in window);
    if (isDesktop) {
      alert(
        'Esta aplicación está diseñada para uso móvil. Para la mejor experiencia, abre esta página desde tu teléfono. Y para cambiar el modo oscuro o blanco en Configuración.'
      );
    }
    
  }
}
