import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { Food } from '../../../interfaces/food';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, HeaderComponent, ListItemComponent],
})
export class FoodListPage implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private foodService = inject(FoodService);
  private navCtrl = inject(NavController);
  // Variables
  categoryId!: number;
  categoryName = '';
  foodItems: Food[] = [];

  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadFoodList();
  }

  // Carga las comidas por categoría
  async loadFoodList() {
    // Obtener categorías
    const categories = await this.foodService.getCategories();
    const category = categories.find((c) => c.id === this.categoryId);

    if (category) {
      this.categoryName = category.name;
    }

    // Obtener productos por categoría
    this.foodItems = await this.foodService.getFoodsByCategory(this.categoryId);
  }

  // Regresar
  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.navCtrl.back();
  }
}
