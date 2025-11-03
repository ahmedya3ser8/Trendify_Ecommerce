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
}
