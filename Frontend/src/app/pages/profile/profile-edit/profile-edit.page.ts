import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// prettier-ignore
import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonSpinner, IonThumbnail, ActionSheetController } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';
import { MessageInvalidComponent } from '../../../components/message-invalid/message-invalid.component';
import { MessageErrorComponent } from '../../../components/message-error/message-error.component';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [IonSpinner, IonButton, IonItem, IonLabel, IonIcon, IonThumbnail ,IonInput, IonContent, CommonModule, ReactiveFormsModule, HeaderComponent, MessageInvalidComponent],
})
export class ProfileEditPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private userService = inject(UserService);
  // Dependencias de Ionic
  private actionSheetController = inject(ActionSheetController);
  private fb = inject(FormBuilder);
  // Variables
  form!: FormGroup;
  profileImage = 'assets/placeholder/avatar.svg'; //por defecto
  isLoading = false;
  title = 'Editar Perfil';
  user!: User;
  message: string = '';
  errors: string[] = [];

  ngOnInit(): void {
    this.loadProfile();
    this.initializeForm();
    this.profileImage;
  }

  // Método Inicializa el formulario
  initializeForm(): void {
    this.form = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      address: ['', [Validators.required]],
    });
  }

  // Método para cargar los datos del usuario
  loadProfile(): void {
    this.userService.get().subscribe({
      next: (resp) => {
        if (resp.isSuccess && resp.response) {
          this.user = resp.response;
          this.form.patchValue(this.user);
        }
      },
      error: (err) => console.error('Error al cargar el perfil', err),
    });
  }

  // Método para cambiar imagen del usuario
  async changeProfilePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen',
      buttons: [
        {
          text: 'Tomar Foto',
          icon: 'Camera',
          handler: () => {
            this.takePicture(CameraSource.Camera);
          },
        },
        {
          text: 'Elegir de Galería',
          icon: 'image',
          handler: () => {
            this.takePicture(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  // Método para tomar foto
  async takePicture(source: CameraSource) {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source: source,
      });

      // this.profileImage = image.dataUrl;
    } catch (err) {
      console.error('Error al tomar la foto', err);
    }
  }

  // Método para guardar los cambios
  updateProfile(): void {
    if (this.form.invalid) return;

    const data = { ...this.form.value };

    this.isLoading = true;

    this.userService.update(data).subscribe({
      next: (resp) => {
        this.isLoading = false;
        if (resp.isSuccess) {
          (document.activeElement as HTMLElement)?.blur();
          this.router.navigate(['/tabs/profile']);
        } else {
          this.errors = [resp.message || 'Error al actualizar el perfil'];
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errors = [err.error?.message || 'Error al actualizar'];
        console.error('Error al actualizar el perfil:', err);
      },
    });
  }

  // Regresar a la pagina anterior
  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/profile']);
  }
}
