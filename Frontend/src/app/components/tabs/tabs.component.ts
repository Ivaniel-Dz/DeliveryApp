import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  IonBadge,
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  imports: [
    IonBadge,
    IonLabel,
    IonTabButton,
    IonIcon,
    IonTabBar,
    IonTabs,
    CommonModule,
  ],
})
export class TabsComponent {
  cartItemCount: number = 0;
}
