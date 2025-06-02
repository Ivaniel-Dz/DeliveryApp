import { Component, inject, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader],
})
export class HeaderComponent {
  private navCtrl = inject(NavController);
  @Input() title: string = 'Titulo';

  goBack() {
    this.navCtrl.back();
  }
}
