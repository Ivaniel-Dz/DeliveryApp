import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import {FormBuilder, FormGroup, FormsModule, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonInputPasswordToggle, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonButton, IonIcon, IonInput, IonItem, IonImg, IonContent, IonInputPasswordToggle, CommonModule, FormsModule ],
})
export class LoginPage implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Formulario
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  ngOnInit(): void {
    // Check if user is already authenticated
  }

  onSubmit() {
    if (this.form.valid) {
      // Aquí llamaría a su método de inicio de sesión de servicio de autores
      // Para fines de prueba, solo navegaremos a las pestañas
    }
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigateByUrl('/tabs/home');
  }

  loginWithGoogle() {
    // Servicio para auth con google
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
