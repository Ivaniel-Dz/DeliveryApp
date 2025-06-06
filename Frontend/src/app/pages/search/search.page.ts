import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
// prettier-ignore
import { IonSearchbar, IonButton, IonContent, IonHeader, IonInfiniteScroll, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Food } from '../../interfaces/food';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  // prettier-ignore
  imports: [ IonSearchbar ,IonHeader, IonTitle, IonToolbar, IonContent, IonInfiniteScroll, IonButton, IonList, CommonModule, FormsModule,],
})
export class SearchPage {
  // Inyección de dependencias
  private router = inject(Router);
  private searchService = inject(SearchService);
  // Variables
  searchQuery = '';
  activeFilter = 'all';
  searchResults: Food[] = [];
  filters = [
    { id: 'all', name: 'Todos' },
    { id: '1', name: 'Hamburguesas' },
    { id: '2', name: 'Pizzas' },
    { id: '3', name: 'Tacos' },
    { id: '4', name: 'Ensaladas' },
    { id: '5', name: 'Postres' },
    { id: '6', name: 'Bebidas' },
  ];

  async onSearch(event: any) {
    this.searchQuery = event.target.value;
    await this.performSearch();
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
  }

  async setFilter(filterId: string) {
    this.activeFilter = filterId;
    if (this.searchQuery.trim() !== '') {
      await this.performSearch();
    }
  }

  async performSearch() {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    const results = await this.searchService.searchFoods(this.searchQuery);
    if (this.activeFilter === 'all') {
      this.searchResults = results;
    } else {
      this.searchResults = results.filter(
        (item) => item.categoryId.toString() === this.activeFilter
      );
    }
  }

  // Redirige a Detalles
  goToFoodDetail(id: number) {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/tabs/food/detail', id]);
  }

  // Método para carga los imágenes alternativas
  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder/foods.webp';
  }
}
