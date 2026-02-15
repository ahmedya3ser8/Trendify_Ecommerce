import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const platformId = inject(PLATFORM_ID);

   // 🚀 Do NOT attach token during SSR
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const token = cookieService.get('access_token');

  if (token) {
    req = req.clone({
      setHeaders: {
        token: token
      }
    });
  }

  return next(req);
};
