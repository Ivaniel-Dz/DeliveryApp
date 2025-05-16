import { Component, inject, Input } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule]
})
export class HeaderComponent {
  private navCtrl = inject(NavController)
  @Input() title: string = 'Titulo'

  goBack(){
    this.navCtrl.back();
  }

}
