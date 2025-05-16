import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  // variable
  private darkMode = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadThemePreference();
  }

  // Método para cargar el tema de preferencia
  async loadThemePreference() {
    try {
      const { value } = await Preferences.get({ key: 'darkMode' });
      const isDark = value === 'true';
      this.setDarkMode(isDark, false);
    } catch (error) {
      console.error('Error de carga de preferencia de tema.', error);
    }
  }

  isDarkMode() {
    return this.darkMode.asObservable();
  }

  // Método para agregar el tema
  async setDarkMode(isDark: boolean, savePreference = true) {
    this.darkMode.next(isDark);

    // Aplicar el tema
    document.body.classList.toggle('dark', isDark);

    // Guardar preferencia
    if (savePreference) {
      try {
        await Preferences.set({
          key: 'darkMode',
          value: isDark.toString(),
        });
      } catch (error) {
        console.error('Error al guardar el tema de preferencia.', error);
      }
    }
  }

}
