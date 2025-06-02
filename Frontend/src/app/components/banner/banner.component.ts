import { Component } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  imports: [IonButton],
})
export class BannerComponent {
  subtitle = '30% de Descuento';
  text = 'En tu primer pedido';
  btnText = 'Ordenar Ahora';
}
