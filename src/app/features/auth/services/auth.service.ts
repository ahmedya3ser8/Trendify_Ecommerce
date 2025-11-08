import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';
import { IUserInfo } from '@core/models/iuser';

interface IResponse {
  message: string;
  token: string;
  user: IUserInfo
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  userInfo = signal<IUserInfo>({} as IUserInfo);
  register(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data).pipe(
      tap(res => this.setUserData(res))
    )
  }
  login(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data).pipe(
      tap(res => this.setUserData(res))
    )
  }
  forgetPassword(data: object): Observable<{ message: string; statusMsg: string; }> {
    return this.http.post<{ message: string; statusMsg: string; }>(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, data)
  }
  verifyCode(data: object): Observable<{ status: string }> {
    return this.http.post<{ status: string }>(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, data)
  }
  resetPassword(data: object): Observable<{ token: string }> {
    return this.http.put<{ token: string }>(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, data)
  }
  updateLoggedUserData(data: object): Observable<IResponse> {
    return this.http.put<IResponse>(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`, data).pipe(
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
    return this.http.put<IResponse>(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, data).pipe(
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
  }
}
