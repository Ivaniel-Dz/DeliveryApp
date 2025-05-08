import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonItem, IonLabel, IonInput, IonIcon, IonButton, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router)
  // private auth

  ngOnInit() {
  }

  goToRegister(){
    this.router.navigate(['/register']);
  }

}
