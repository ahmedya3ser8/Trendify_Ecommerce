import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService);
  const router = inject(Router);
  if (cookieService.check('access_token')) {
    return router.createUrlTree(['/home']);
  }
  return true;
};
