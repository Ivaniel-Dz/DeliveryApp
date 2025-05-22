import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegisterPage {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Formulario
  public form: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  onSubmit() {
    if (this.form.valid) {
      // Aquí llamaría a su método de inicio de sesión de servicio de autores
      // Para fines de prueba, solo navegaremos a las pestañas
    }
    this.router.navigate(['/tabs/home']);
  }

  registerWithGoogle() {
    // this.authService.loginWithGoogle();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
