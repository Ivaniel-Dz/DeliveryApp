// prettier-ignore
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonInput ,IonButton, IonContent, IonIcon, IonSpinner, IonImg, IonItem, IonInputPasswordToggle  } from '@ionic/angular/standalone';
import { Login } from '../../interfaces/login';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { MessageInvalidComponent } from '../../components/message-invalid/message-invalid.component';
import { MessageErrorComponent } from '../../components/message-error/message-error.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ CommonModule, ReactiveFormsModule, IonSpinner, IonContent, IonIcon, IonButton, IonImg, IonItem, IonInput ,IonInputPasswordToggle, MessageInvalidComponent, MessageErrorComponent],
})
export class LoginPage {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private authService = inject(AuthService);
  private jwtService = inject(JwtService);

  // Variables
  errors: string[] = [];
  loading = false;

  // Formulario
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  // Método para iniciar sesión
  signIn() {
    if (this.form.invalid) return;

    const credentials: Login = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.loading = true;
    this.authService.login(credentials).subscribe({
      next: async (resp) => {
        this.loading = false;
        if (resp.isSuccess && resp.token) {
          await this.jwtService.setToken(resp.token);
          this.router.navigate(['tabs/home']);
        } else {
          this.errors = [resp.message || 'Error al iniciar sesión'];
        }
      },
      error: (err) => {
        this.loading = false;
        console.error('Error en login:', err);
        this.errors = err.error?.errors || [
          err.error?.message || 'Credenciales incorrectas',
        ];
      },
    });
  }

  // Método para ir a la pagina de registro
  goToRegister() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/register']);
  }

}
