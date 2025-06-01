import {
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { Login } from '../../interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule , IonicModule],
})
export class LoginPage {
  // Inyección de dependencias
  private fb = inject(FormBuilder);
  private router = inject(Router);

  private socialAuth = inject(SocialAuthService);
  private authService = inject(AuthService);
  private jwtService = inject(JwtService);

  // Variables
  user: SocialUser | null = null;
  errors: string[] = [];
  loading = false;

  // Formulario
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });

  // Método para iniciar sesión predeterminada
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

  // Método para iniciar sesión con Google
  loginWithGoogle() {
    this.loading = true;
    this.socialAuth
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        this.user = user;
        const idToken = user.idToken;
        this.authService.loginWithGoogle(idToken).subscribe({
          next: async (resp) => {
            this.loading = false;
            if (resp.token) {
              await this.jwtService.setToken(resp.token);
              this.router.navigate(['tabs/home']);
            } else {
              this.errors = ['No se recibió token del servidor'];
            }
          },
          error: (err) => {
            this.loading = false;
            console.error('Error en login con Google: ', err);
            this.errors = [
              err.error?.message || 'Error al iniciar sesión con Google',
            ];
          },
        });
      })
      .catch((err) => {
        this.loading = false;
        console.error('Error al iniciar sesión con Google: ', err);
        this.errors = ['No se pudo iniciar sesión con Google'];
      });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  
}
