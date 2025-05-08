import { Routes } from '@angular/router';
import { SplashComponent } from './components/splash/splash.component';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage } from './auth/register/register.page';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomePage } from './pages/home/home.page';

export const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      { path: 'home', component: HomePage }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
