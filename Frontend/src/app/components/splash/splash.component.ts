import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [IonContent, IonSpinner],
})
export class SplashComponent implements OnInit {
  private router = inject(Router);

  constructor() {}

  /**
   * Método que se ejecuta al inicializar el componente.
   * Redirige a la página de login después de 2 segundos.
   */
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000); // 2 segundos de espera
  }
  
}
