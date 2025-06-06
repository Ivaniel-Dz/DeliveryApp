import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage } from './auth/register/register.page';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomePage } from './pages/home/home.page';
import { SearchPage } from './pages/search/search.page';
import { FoodListPage } from './pages/food/food-list/food-list.page';
import { FoodDetailPage } from './pages/food/food-detail/food-detail.page';
import { FoodCategoryPage } from './pages/food/food-category/food-category.page';
import { ProfileViewPage } from './pages/profile/profile-view/profile-view.page';
import { ProfileEditPage } from './pages/profile/profile-edit/profile-edit.page';
import { CartViewPage } from './pages/cart/cart-view/cart-view.page';
import { FoodPopularPage } from './pages/food/food-popular/food-popular.page';
import { SettingsViewPage } from './pages/settings/settings-view/settings-view.page';
import { ChangePasswordPage } from './pages/settings/change-password/change-password.page';
import { authGuard } from './guards/auth.guard';
import { redirectInvalidRouteGuard } from './guards/redirect-invalid-route.guard';
import { CheckoutPage } from './pages/cart/checkout/checkout.page';
import { DeliveryAddressPage } from './pages/delivery/delivery-address/delivery-address.page';
import { OrderHistoryPage } from './pages/delivery/order-history/order-history.page';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomePage },
      { path: 'search', component: SearchPage },
      { path: 'cart', component: CartViewPage },
      { path: 'cart/checkout', component: CheckoutPage },
      { path: 'profile', component: ProfileViewPage },
      { path: 'profile/edit', component: ProfileEditPage },
      { path: 'food/category', component: FoodCategoryPage },
      { path: 'food/popular', component: FoodPopularPage },
      { path: 'food/:id', component: FoodListPage },
      { path: 'food/detail/:id', component: FoodDetailPage },
      { path: 'settings', component: SettingsViewPage },
      { path: 'settings/change-password', component: ChangePasswordPage },
      { path: 'delivery/order-history', component: OrderHistoryPage },
      { path: 'delivery/address', component: DeliveryAddressPage },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    canActivate: [redirectInvalidRouteGuard],
    component: LoginPage, // este nunca se renderizara, es obligatorio por sintaxis
  },
];
