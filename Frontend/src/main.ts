import { bootstrapApplication } from '@angular/platform-browser';
// prettier-ignore
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Ionic + Routing
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Cliente HTTP para consumir API (HttpClient)
    provideHttpClient(),
    
  ],
});
