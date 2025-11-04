import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (cookieService.get('access_token')) {
    router.navigateByUrl('/home')
    return false;
  } else {
    return true;
  }
};
