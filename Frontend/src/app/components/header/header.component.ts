import { Component, EventEmitter, Input, Output } from '@angular/core';
// prettier-ignore
import { IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader],
})
export class HeaderComponent {
  // Recibe del padre
  @Input() title: string = 'Titulo';
  // Envía el evento al padre
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
}
