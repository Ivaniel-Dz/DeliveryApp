import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonInputPasswordToggle,
  IonImg,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonImg,
    IonInput,
    IonItem,
    IonIcon,
    IonContent,
    IonButton,
    IonInputPasswordToggle,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterPage implements OnInit {
  router = inject(Router);

  ngOnInit() {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
