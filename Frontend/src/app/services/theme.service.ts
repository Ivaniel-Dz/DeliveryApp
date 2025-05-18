import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
// Variable global
const DARK_MODE_KEY = 'dark-mode';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  constructor() {
    this.prefersDark.addEventListener('change', (mediaQuery) =>
      this.setDarkMode(mediaQuery.matches)
    );
  }

  async loadUserPreference() {
    const stored = await Preferences.get({ key: DARK_MODE_KEY });

    if (stored.value !== null) {
      this.setDarkMode(stored.value === 'true');
    } else {
      this.setDarkMode(this.prefersDark.matches);
    }
  }

  async setDarkMode(isDark: boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', isDark);
    await Preferences.set({ key: DARK_MODE_KEY, value: String(isDark) });
  }

  async toggleDarkMode() {
    const isDark =
      document.documentElement.classList.contains('ion-palette-dark');
    this.setDarkMode(!isDark);
  }

  async getDarkMode(): Promise<boolean> {
    const stored = await Preferences.get({ key: DARK_MODE_KEY });
    return stored.value === 'true';
  }
}
