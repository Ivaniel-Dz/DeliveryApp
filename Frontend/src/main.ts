import { bootstrapApplication } from '@angular/platform-browser';
// prettier-ignore
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Ionic + Routing
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Http Client con interceptor de autenticación
    provideHttpClient(withInterceptors([authInterceptor])),
    
  ],
});
