import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
// prettier-ignore
import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-delivery-address',
  templateUrl: './delivery-address.page.html',
  styleUrls: ['./delivery-address.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonLabel, IonItem, IonContent, IonBadge, IonTitle, IonIcon, IonButton, IonButtons, IonToolbar, IonHeader, CommonModule, FormsModule, ReactiveFormsModule ],
})
export class DeliveryAddressPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  addresses = [
    {
      id: 1,
      name: 'Casa',
      address: 'Calle Principal 123',
      city: 'Ciudad de México',
      zipCode: '01000',
      isDefault: true,
    },
    {
      id: 2,
      name: 'Trabajo',
      address: 'Av. Reforma 456',
      city: 'Ciudad de México',
      zipCode: '06500',
      isDefault: false,
    },
  ];

  showAddressForm = false;
  addressForm: FormGroup;
  editingAddressId: number | null = null;

  constructor() {
    this.addressForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
      isDefault: [false],
    });
  }

  ngOnInit() {}

  addNewAddress() {
    this.editingAddressId = null;
    this.addressForm.reset({
      name: '',
      address: '',
      city: '',
      zipCode: '',
      isDefault: false,
    });
    this.showAddressForm = true;
  }

  editAddress(address: any) {
    this.editingAddressId = address.id;
    this.addressForm.patchValue({
      name: address.name,
      address: address.address,
      city: address.city,
      zipCode: address.zipCode,
      isDefault: address.isDefault,
    });
    this.showAddressForm = true;
  }

  async confirmDeleteAddress(address: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Dirección',
      message: '¿Estás seguro que deseas eliminar esta dirección?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.deleteAddress(address.id);
          },
        },
      ],
    });

    await alert.present();
  }

  deleteAddress(addressId: number) {
    this.addresses = this.addresses.filter((a) => a.id !== addressId);
    this.presentToast('Dirección eliminada correctamente');
  }

  saveAddress() {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;

      if (formValue.isDefault) {
        this.addresses.forEach((a) => (a.isDefault = false));
      }

      if (this.editingAddressId) {
        const index = this.addresses.findIndex(
          (a) => a.id === this.editingAddressId
        );
        if (index !== -1) {
          this.addresses[index] = {
            ...this.addresses[index],
            ...formValue,
          };
        }
        this.presentToast('Dirección actualizada correctamente');
      } else {
        const newId = Math.max(0, ...this.addresses.map((a) => a.id)) + 1;
        this.addresses.push({
          id: newId,
          ...formValue,
        });
        this.presentToast('Dirección agregada correctamente');
      }

      this.showAddressForm = false;
    } else {
      Object.keys(this.addressForm.controls).forEach((key) => {
        this.addressForm.get(key)?.markAsTouched();
      });
    }
  }

  cancelAddressForm() {
    this.showAddressForm = false;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }

  goBack() {
    this.router.navigate(['/tabs/profile']);
  }
}
