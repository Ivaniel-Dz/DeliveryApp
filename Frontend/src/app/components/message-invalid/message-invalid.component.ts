import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-invalid',
  templateUrl: './message-invalid.component.html',
  styleUrls: ['./message-invalid.component.scss'],
  imports: [CommonModule]
})
export class MessageInvalidComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() message!: string;
}
