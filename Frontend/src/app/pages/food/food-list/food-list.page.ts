import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../../components/header/header.component';
import { ListItemComponent } from '../../../components/list-item/list-item.component';
import { Food } from '../../../interfaces/food';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.page.html',
  styleUrls: ['./food-list.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, ListItemComponent, IonContent],
})
export class FoodListPage implements OnInit {
  // Inyección de dependencias
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoryService = inject(CategoryService);
  // Variables
  categoryName = '';
  food: Food[] = [];

  ngOnInit(): void {
    this.loadCategoryName();
    this.loadFoodList();
  }

  // Obtener el nombre de la categoría
  loadCategoryName(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getList().subscribe({
        next: (categories) => {
          const category = categories.find((cat) => cat.id === parseInt(id));
          this.categoryName = category ? category.name : '';
        },
        error: (err) => {
          console.error('Error al cargar las categorías', err);
        },
      });
    }
  }

  // Carga las comidas por categoría
  loadFoodList(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService.getById(parseInt(id)).subscribe({
        next: (res) => {
          this.food = res;
        },
        error: (err) => {
          console.error('Error al cargar las comidas por categoría', err);
          (document.activeElement as HTMLElement)?.blur();
          this.router.navigate(['/tabs/home']);
        },
      });
    } else {
      console.error('Id de categoría no encontrado en la ruta');
      (document.activeElement as HTMLElement)?.blur();
      this.router.navigate(['/tabs/home']);
    }
  }
}
