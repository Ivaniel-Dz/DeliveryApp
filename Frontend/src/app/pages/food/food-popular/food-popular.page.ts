import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { Food } from '../../../interfaces/food';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-food-popular',
  templateUrl: './food-popular.page.html',
  styleUrls: ['./food-popular.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, HeaderComponent, ListItemComponent],
})
export class FoodPopularPage implements OnInit {
  // Dependencias
  private foodService = inject(FoodService);
  private router = inject(Router);
  // Variables
  popularItems: Food[] = [];
  title = 'Populares';

  ngOnInit() {
    this.foodService.getPopularFoods(10).then((items) => {
      this.popularItems = items;
    });
  }

  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/home']);
  }
}
