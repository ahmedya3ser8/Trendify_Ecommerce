import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { IUserInfo } from '@core/models/iuser';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { BASE_URL } from '@core/tokens/api-url.token';
import { isPlatformBrowser } from '@angular/common';

interface IResponse {
  message: string;
  token: string;
  user: IUserInfo
}

interface IDecodedToken {
  id: string
  name: string
  role: string
  iat: number
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  private readonly BASE_URL = inject(BASE_URL);
  private readonly platformId = inject(PLATFORM_ID);

  userInfo = signal<IUserInfo>({} as IUserInfo);
  userId = signal('');
  isAuthenticated = signal(false);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAuth();
    }
  }

  register(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.BASE_URL}/api/v1/auth/signup`, data).pipe(
      tap(res => this.setUserData(res))
    )
  }

  login(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`${this.BASE_URL}/api/v1/auth/signin`, data).pipe(
      tap(res => {
        this.setUserData(res)
      })
    )
  }

  forgetPassword(data: object): Observable<{ message: string; statusMsg: string; }> {
    return this.http.post<{ message: string; statusMsg: string; }>(`${this.BASE_URL}/api/v1/auth/forgotPasswords`, data)
  }

  verifyCode(data: object): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`${this.BASE_URL}/api/v1/auth/verifyResetCode`, data)
  }

  resetPassword(data: object): Observable<{ token: string }> {
    return this.http.put<{ token: string }>(`${this.BASE_URL}/api/v1/auth/resetPassword`, data)
  }

  updateLoggedUserData(data: object): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.BASE_URL}/api/v1/users/updateMe/`, data).pipe(
      tap(res => {
        this.cookieService.set('userInfo', JSON.stringify(res.user), {
          path: '/',
          expires: 7,
          sameSite: 'Lax'
        })
        this.userInfo.set(res.user);
      })
    )
  }

  updateLoggedUserPassword(data: object): Observable<IResponse> {
    return this.http.put<IResponse>(`${this.BASE_URL}/api/v1/users/changeMyPassword`, data).pipe(
      tap(res => this.setUserData(res))
    )
  }

  private setUserData(res: IResponse): void {
    this.cookieService.set('access_token', res.token, {
      path: '/',
      expires: 7,
      sameSite: 'Lax'
    })

    this.cookieService.set('userInfo', JSON.stringify(res.user), {
      path: '/',
      expires: 7,
      sameSite: 'Lax'
    })

    this.userInfo.set(res.user);
    this.isAuthenticated.set(true);

    const decoded = jwtDecode<IDecodedToken>(res.token);
    this.userId.set(decoded.id);
  }

  logout(): void {
    this.cookieService.delete('access_token', '/');
    this.cookieService.delete('userInfo', '/');
    this.router.navigate(['/auth/login']);
  }

  private initializeAuth() {
    const token =  this.cookieService.get('access_token');
    if (!token) {
      this.isAuthenticated.set(false);
      return;
    }
    try {
      const decoded = jwtDecode<IDecodedToken>(token);
      this.userId.set(decoded.id);
      this.isAuthenticated.set(true);
      const user = this.cookieService.get('userInfo');
      if (user) {
        this.userInfo.set(JSON.parse(user));
      }
    } catch(err) {
      console.log(err);
      this.logout();
    }
  }
}
