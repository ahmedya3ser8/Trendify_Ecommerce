import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (cookieService.get('access_token')) {
    return true;
  } else {
    router.navigateByUrl('/auth/login');
    return false;
  }
};
