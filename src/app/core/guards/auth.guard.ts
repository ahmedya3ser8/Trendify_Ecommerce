import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // ✅ If server → allow navigation (do NOT redirect)
  if (!isPlatformBrowser(platformId)) {
    return true;
  }

  // ✅ Only check auth in browser
  if (!authService.isAuthenticated()) {
    return router.parseUrl('/auth/login');
  }

  return true;
};
