import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
// prettier-ignore
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonButton, IonInput, IonRadioGroup, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonRadio, IonTitle, IonToolbar, ToastController } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  // prettier-ignore
  imports: [ IonContent, IonInput, IonRadioGroup, IonTitle, IonRadio, IonItem, IonLabel, IonIcon, IonButton, IonButtons, IonToolbar, IonHeader, CommonModule, FormsModule, ReactiveFormsModule ],
})
export class CheckoutPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private cartService = inject(CartService);
  private toastController = inject(ToastController);
  private userService = inject(UserService);

  checkoutForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9+]+$')]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zipCode: ['', [Validators.required]],
    paymentMethod: ['credit', [Validators.required]],
    cardNumber: ['', [Validators.pattern('^[0-9]{16}$')]],
    cardExpiry: ['', [Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$')]],
    cardCvv: ['', [Validators.pattern('^[0-9]{3,4}$')]],
  });

  subtotal = 0;
  deliveryFee = 2.99;
  total = 0;

  paymentMethods = [
    { id: 'credit', name: 'Tarjeta de Crédito' },
    { id: 'debit', name: 'Tarjeta de Débito' },
    { id: 'paypal', name: 'PayPal' },
    { id: 'cash', name: 'Efectivo' },
  ];

  ngOnInit() {
    this.calculateTotals();

    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe((method) => {
      const cardNumber = this.checkoutForm.get('cardNumber');
      const cardExpiry = this.checkoutForm.get('cardExpiry');
      const cardCvv = this.checkoutForm.get('cardCvv');

      if (method === 'credit' || method === 'debit') {
        cardNumber?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{16}$'),
        ]);
        cardExpiry?.setValidators([
          Validators.required,
          Validators.pattern('^(0[1-9]|1[0-2])/[0-9]{2}$'),
        ]);
        cardCvv?.setValidators([
          Validators.required,
          Validators.pattern('^[0-9]{3,4}$'),
        ]);
      } else {
        cardNumber?.clearValidators();
        cardExpiry?.clearValidators();
        cardCvv?.clearValidators();
      }

      cardNumber?.updateValueAndValidity();
      cardExpiry?.updateValueAndValidity();
      cardCvv?.updateValueAndValidity();
    });
  }

  calculateTotals() {
    this.cartService.getCartItems().subscribe((items) => {
      this.subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      this.total = this.subtotal + this.deliveryFee;
    });
  }

  async placeOrder() {
    if (this.checkoutForm.valid) {
      const orderData = {
        id: 'ORD-' + Date.now(),
        date: new Date(),
        total: this.total,
        status: 'delivered',
        items: await firstValueFrom(this.cartService.getCartItems()),
      };

      // Guarda el pedido en el historial
      await this.userService.addOrder(orderData);

      this.cartService.clearCart();

      const toast = await this.toastController.create({
        message: '¡Pedido realizado con éxito!',
        duration: 2000,
        color: 'success',
        position: 'bottom',
      });
      await toast.present();

      (document.activeElement as HTMLElement)?.blur();
      this.router.navigate(['/tabs/home']);
    } else {
      this.markFormGroupTouched(this.checkoutForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/cart']);
  }
  
}
