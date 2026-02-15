import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toastrService = inject(ToastrService);
  const platformId = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (isPlatformBrowser(platformId)) {
        if (err.status === 401) {
          toastrService.error('You are not logged in. Please login to get access');
        } else {
          toastrService.error(err.error?.message || 'Something went wrong');
        }
      }
      return throwError(() => err);
    })
  );
};
