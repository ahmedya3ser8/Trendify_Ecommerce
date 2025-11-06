import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { ICartResponse } from '@core/models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  cart = signal<ICartResponse>({} as ICartResponse);
  addProductToCart(productId: string): Observable<ICartResponse> {
    return this.http.post<ICartResponse>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId })
  }
  getLoggedUserCart(): Observable<ICartResponse> {
    return this.http.get<ICartResponse>(`https://ecommerce.routemisr.com/api/v1/cart`).pipe(
      tap(res => this.cart.set(res))
    )
  }
  removeSpecificCartItem(productId: string): Observable<ICartResponse> {
    return this.http.delete<ICartResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`).pipe(
      tap(res => this.cart.set(res))
    )
  }
  updateCartProductQuantity(productId: string, count: number): Observable<ICartResponse> {
    return this.http.put<ICartResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count }).pipe(
      tap(res => this.cart.set(res))
    )
  }
}
