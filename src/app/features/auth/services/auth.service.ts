import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IResponse {
  message: string;
  token: string;
  user: {
    email: string;
    name: string;
    role: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  register(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/auth/signup`, data);
  }
  login(data: object): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/auth/signin`, data);
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
}
