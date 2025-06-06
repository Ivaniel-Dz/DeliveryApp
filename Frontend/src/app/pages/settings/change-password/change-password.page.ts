import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonInput, IonButton, IonContent, IonItem, IonLabel, IonSpinner, ToastController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService } from '../../../services/user.service';
import { MessageErrorComponent } from '../../../components/message-error/message-error.component';
import { AlertUtils } from '../../../utils/alert.util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [IonSpinner, IonButton, IonInput ,IonLabel, IonItem, IonContent, CommonModule, ReactiveFormsModule,HeaderComponent, MessageErrorComponent],
})
export class ChangePasswordPage implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastController = inject(ToastController);
  private userService = inject(UserService);
  alertUtils = new AlertUtils(this.toastController);

  form!: FormGroup;
  isLoading = false;
  title = 'Cambiar Contraseña';
  errors: string[] = [];

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(5)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  async changePassword() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
      return;
    }

    const data = { ...this.form.value };
    this.isLoading = true;

    this.userService.updatePassword(data).subscribe({
      next: async (resp) => {
        this.isLoading = false;
        if (resp.isSuccess) {
          // Alerta de éxito
          await this.alertUtils.showToast(
            'Contraseña cambiada correctamente.', { color: 'success',}
          );

          (document.activeElement as HTMLElement)?.blur();
          this.router.navigate(['/login']);
        } else {
          this.errors = [resp.message || 'Erro al cambiar la contraseña'];
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errors = [err.error?.message || 'Error al cambiar la contraseña'];
      },
    });
  }

  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/settings']);
  }
}
