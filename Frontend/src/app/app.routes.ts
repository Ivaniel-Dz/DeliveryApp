import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage } from './auth/register/register.page';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomePage } from './pages/home/home.page';
import { CartPage } from './pages/cart/cart.page';
import { CategoryPage } from './pages/category/category.page';
import { DetailPage } from './pages/detail/detail.page';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'home', component: HomePage },
      { path: 'category/:id', component: CategoryPage },
      { path: 'detail/:id', component: DetailPage },
      { path: 'cart', component: CartPage },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
