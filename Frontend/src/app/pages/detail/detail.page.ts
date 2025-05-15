import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../services/food.service';
import { Food } from '../../interfaces/food';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class DetailPage implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);
  // Variable
  foodId!: number;
  foodData: Food | undefined;
  isFavorite = false;
  quantity = 1;

  // Se ejecuta al inicio del componente
  ngOnInit() {
    this.foodId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFoodDetails();
  }

  // Detalles de la comida
  async loadFoodDetails() {
    this.foodData = await this.foodService.getFoodById(this.foodId);
    if (!this.foodData) {
      // Si no se encuentra, navegar de regreso o mostrar mensaje
      this.router.navigate(['/tabs/home']);
    }
  }

  // Regresar a Home
  goBack() {
    this.router.navigate(['/tabs/home']);
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
    console.log( 'Added to cart:', this.foodData?.name , 'Quantity:', this.quantity);

    // Redirige al carrito
    this.router.navigate(['/tabs/cart']);
  }

}
