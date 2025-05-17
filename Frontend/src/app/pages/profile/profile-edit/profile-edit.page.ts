import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class ProfileEditPage implements OnInit {
  // Inyección de dependencias
  private router = inject(Router);
  private navCtrl = inject(NavController);
  // Dependencias de Ionic
  private actionSheetController = inject(ActionSheetController);
  private toastController = inject(ToastController);
  private fb = inject(FormBuilder);
  // Variables
  form!: FormGroup;
  profileImage = 'assets/placeholder/avatar.svg'; //por defecto
  isLoading = false;

  ngOnInit() {
    this.loadUserProfile();
    this.initializeForm();
    this.profileImage;
  }

  // Método Inicializa el formulario
  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
      address: ['', [Validators.required]],
    });
  }

  // Método para cargar los datos del usuario
  loadUserProfile() {
    this.isLoading = true;
    // servicio del usuario
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
  async saveProfile() {
    if (this.form.valid) {
      this.isLoading = true;
      const userData = { ...this.form.value, picture: this.profileImage };
    } else {
    }
  }

  // Regresar a la pagina anterior
  goBack() {
    this.navCtrl.back();
  }
  
}
