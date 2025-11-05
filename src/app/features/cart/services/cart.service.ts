import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICart } from '@core/models/icart';

interface IResponse {
  cartId: string;
  message: string;
  status: string;
  numOfCartItems: number;
  data: ICart
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly http = inject(HttpClient);
  addProductToCart(productId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/cart`, { productId })
  }
  getLoggedUserCart(): Observable<IResponse> {
    return this.http.get<IResponse>(`https://ecommerce.routemisr.com/api/v1/cart`)
  }
  removeSpecificCartItem(productId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`)
  }
  updateCartProductQuantity(productId: string, count: number): Observable<IResponse> {
    return this.http.put<IResponse>(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { count })
  }
}
