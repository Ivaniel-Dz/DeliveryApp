import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule,
} from '@abacritt/angularx-social-login';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Ionic + Routing
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Cliente HTTP para consumir API (HttpClient)
    provideHttpClient(),

    // Social Login con Google
    /*
    importProvidersFrom(SocialLoginModule),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '290405177840-50sg1qnkkm6pv7jcqk88c7p3n9dv27bk.apps.googleusercontent.com'
            ),
          },
        ],
      } satisfies SocialAuthServiceConfig,
    },
    */
  ],
});
