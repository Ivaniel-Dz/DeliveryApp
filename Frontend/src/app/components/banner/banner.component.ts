import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  imports: [IonicModule],
})
export class BannerComponent {
  subtitle = '30% de Descuento';
  text = 'En tu primer pedido';
  btnText = 'Ordenar Ahora';
}
