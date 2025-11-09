import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { errorsInterceptor } from '@core/interceptors/errors.interceptor';
import { headersInterceptor } from '@core/interceptors/headers.interceptor';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';
import Aura from '@primeuix/themes/aura';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import { appRoutes } from './app.routes';
import { BASE_URL, CHECKOUT_URL } from '@core/tokens/api-url.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withViewTransitions(), withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([headersInterceptor, loadingInterceptor, errorsInterceptor])),
    provideAnimationsAsync(),
    provideToastr(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false
        }
      }
    }),
    CookieService,
    {
      provide: BASE_URL,
      useValue: 'https://ecommerce.routemisr.com'
    },
    {
      provide: CHECKOUT_URL,
      useValue: 'https://trendify-eco.vercel.app'
    }
  ]
};
