import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../interfaces/food';
import { HeaderComponent } from '../../../components/header/header.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-popular',
  templateUrl: './food-popular.page.html',
  styleUrls: ['./food-popular.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ListItemComponent, IonContent],
})
export class FoodPopularPage implements OnInit {
  // Inyección de dependencias
  private foodService = inject(FoodService);
  private router = inject(Router);
  // Variables
  popularItems: Food[] = [];
  title = 'Populares';

  // Se ejecuta al iniciar el componente
  ngOnInit() {
    this.foodService.getPopularFoods(10).then((items) => {
      this.popularItems = items;
    });
  }

  // Regresar a Home
  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/home']);
  }
  
}
