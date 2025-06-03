import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
// prettier-ignore
import { IonBadge, IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  // prettier-ignore
  imports: [ IonBadge, IonLabel, IonIcon, IonTabButton, IonTabBar, IonTabs, CommonModule ],
})
export class TabsComponent {
  cartItemCount: number = 0;
}
