import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { appRoutes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { CookieService } from 'ngx-cookie-service';
import Aura from '@primeuix/themes/aura';
import { headersInterceptor } from '@core/interceptors/headers.interceptor';
import { loadingInterceptor } from '@core/interceptors/loading.interceptor';
import { errorsInterceptor } from '@core/interceptors/errors.interceptor';
import { provideToastr } from 'ngx-toastr';

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
    importProvidersFrom(CookieService)
  ]
};
