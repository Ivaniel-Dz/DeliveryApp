import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule, HeaderComponent],
})
export class ChangePasswordPage implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private navCtrl = inject(NavController);
  private toastController = inject(ToastController);

  form!: FormGroup;
  isLoading = false;
  title = 'Cambiar Contraseña';

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
    if (this.form.valid) {
      this.isLoading = true;

      setTimeout(async () => {
        this.isLoading = false;
        const toast = await this.toastController.create({
          message: 'Contraseña actualizada correctamente',
          duration: 2000,
          color: 'success',
          position: 'bottom',
        });
        await toast.present();
        this.router.navigate(['tabs/settings']);
      }, 1500);
    } else {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.get(key)?.markAsTouched();
      });
    }
  }

  goBack() {
    this.router.navigate(['/tabs/settings']);
  }
}
