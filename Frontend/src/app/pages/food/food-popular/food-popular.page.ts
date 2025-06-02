import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, } from '@ionic/angular/standalone';
import { FoodService } from '../../../services/food.service';
import { Food } from '../../../interfaces/food';
import { HeaderComponent } from '../../../components/header/header.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';

@Component({
  selector: 'app-food-popular',
  templateUrl: './food-popular.page.html',
  styleUrls: ['./food-popular.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ListItemComponent, IonContent],
})
export class FoodPopularPage implements OnInit {
  private foodService = inject(FoodService);
  popularItems: Food[] = [];
  title = 'Populares';

  ngOnInit() {
    this.foodService.getPopularFoods(10).then((items) => {
      this.popularItems = items;
    });
  }
}
