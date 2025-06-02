import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { IonContent, IonButton, IonIcon, IonItemDivider } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from '../../../interfaces/food';
import { CartService } from '../../../services/cart.service';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.page.html',
  styleUrls: ['./food-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonItemDivider],
})
export class FoodDetailPage implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);
  private navCtrl = inject(NavController);
  // Variable
  foodData? : Food;
  isFavorite = false;
  quantity = 1;

  // Se ejecuta al inicio del componente
  ngOnInit(): void {
    this.loadFoodDetails();
  }

  // Detalles de la comida
  loadFoodDetails(): void {
    // Obtener el id de la comida desde la ruta
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Verificar si el id es válido
    if (id) {
      this.foodService.getFoodById(id).subscribe({
        next: (data) => {
          this.foodData = data;
        },
        error: (err) => {
          console.error('Error al cargar los datos de la comida', err);
          this.router.navigate(['/tabs/home']);
        },
      });
    } else {
      console.error('Id de comida no encontrado en la ruta');
      this.router.navigate(['/tabs/home']);
    }
  }

  // Regresar
  goBack() {
    this.navCtrl.back();
  }

  // Favorito
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  // Incrementar cantidad
  incrementQuantity() {
    this.quantity++;
  }

  // Quitar cantidad
  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Agregar producto al carrito
  addCartItem() {
    if (this.foodData) {
      this.cartService.addToCart({
        id: this.foodData.id,
        name: this.foodData.name,
        price: this.foodData.price,
        quantity: this.quantity,
        image: this.foodData.image,
      });
    }

    // Show toast or notification
    console.log(
      'Added to cart:',
      this.foodData?.name,
      'Quantity:',
      this.quantity
    );

    // Redirige al carrito
    this.router.navigate(['/tabs/cart']);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
}
