import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule]
})
export class HeaderComponent {
  // Recibe del padre
  @Input() title: string = 'Titulo'
  // Envía el evento al padre
  @Output() back = new EventEmitter<void>()

  onBack(){
    this.back.emit();
  }

}
