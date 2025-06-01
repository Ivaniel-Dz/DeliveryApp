import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  imports: [CommonModule],
})
export class MessageErrorComponent {
  @Input() errors: string[] = [];
}
