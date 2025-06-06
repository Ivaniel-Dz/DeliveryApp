import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonContent, IonImg, IonItem, IonInput, IonIcon, IonButton, IonInputPasswordToggle, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { MessageErrorComponent } from '../../components/message-error/message-error.component';
import { MessageInvalidComponent } from '../../components/message-invalid/message-invalid.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ CommonModule, ReactiveFormsModule, IonContent, IonImg, IonItem, IonInput, IonIcon, IonButton, IonInputPasswordToggle, IonSpinner, MessageErrorComponent, MessageInvalidComponent],
})
export class RegisterPage implements OnInit {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  // Propiedades del componente
  form!: FormGroup;
  errors: string[] = [];
  loading = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  // Método para registrar al usuario
  signUp(): void {
    if (this.form.invalid) return;

    const register = this.form.value;

    this.loading = true;
    this.authService.register(register).subscribe({
      next: (resp) => {
        this.loading = false;
        if (resp.isSuccess) {
          (document.activeElement as HTMLElement)?.blur();
          this.router.navigate(['/login']);
        } else {
          this.errors = [resp.message || 'Error al registrarse'];
        }
      },
      error: (err) => {
        this.loading = false;
        this.errors = [err.error?.message || 'Error al registrarse'];
        console.error('Error en el registro: ', err);
      },
    });
  }

  goToLogin() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/login']);
  }
}
