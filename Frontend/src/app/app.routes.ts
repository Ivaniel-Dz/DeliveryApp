import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage } from './auth/register/register.page';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomePage } from './pages/home/home.page';
import { CartPage } from './pages/cart/cart.page';
import { SearchPage } from './pages/search/search.page';
import { ProfilePage } from './pages/profile/profile.page';
import { FoodListPage } from './pages/food/food-list/food-list.page';
import { FoodDetailPage } from './pages/food/food-detail/food-detail.page';
import { FoodCategoryPage } from './pages/food/food-category/food-category.page';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'home', component: HomePage },
      { path: 'search', component: SearchPage },
      { path: 'cart', component: CartPage },
      { path: 'profile', component: ProfilePage },
      { path: 'food', component: FoodListPage },
      { path: 'food/detail/:id', component: FoodDetailPage },
      { path: 'food/category/:id', component: FoodCategoryPage },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
