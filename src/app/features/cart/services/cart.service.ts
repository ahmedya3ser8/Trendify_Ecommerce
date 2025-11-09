import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ICartResponse } from '@core/models/icart';
import { BASE_URL } from '@core/tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = inject(BASE_URL);
  cart = signal<ICartResponse>({} as ICartResponse);
  addProductToCart(productId: string): Observable<ICartResponse> {
    return this.http.post<ICartResponse>(`${this.BASE_URL}/api/v1/cart`, { productId })
  }
  getLoggedUserCart(): Observable<ICartResponse> {
    return this.http.get<ICartResponse>(`${this.BASE_URL}/api/v1/cart`).pipe(
      tap(res => this.cart.set(res))
    )
  }
  removeSpecificCartItem(productId: string): Observable<ICartResponse> {
    return this.http.delete<ICartResponse>(`${this.BASE_URL}/api/v1/cart/${productId}`).pipe(
      tap(res => this.cart.set(res))
    )
  }
  updateCartProductQuantity(productId: string, count: number): Observable<ICartResponse> {
    return this.http.put<ICartResponse>(`${this.BASE_URL}/api/v1/cart/${productId}`, { count }).pipe(
      tap(res => this.cart.set(res))
    )
  }
}
