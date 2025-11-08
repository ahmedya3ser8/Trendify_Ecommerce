import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { IProduct } from '@core/models/iproduct';

interface IResponse {
  status: string;
  message: string;
  data: string[];
}

interface ILoggedUserResponse {
  status: string;
  count: number;
  data: IProduct[];
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private readonly http = inject(HttpClient);
  private wishlistIds = signal<string[]>([]);
  wishlistProducts = signal<IProduct[]>([]);
  addToWishlist(productId: string): Observable<IResponse> {
    return this.http.post<IResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId }).pipe(
      tap(res => this.wishlistIds.set(res.data))
    )
  }
  removeFromWishlist(productId: string): Observable<IResponse> {
    return this.http.delete<IResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`).pipe(
      tap(res => this.wishlistIds.set(res.data))
    )
  }
  getLoggedUserWishlist(): Observable<ILoggedUserResponse> {
    return this.http.get<ILoggedUserResponse>(`https://ecommerce.routemisr.com/api/v1/wishlist`).pipe(
      tap(res => {
        const ids = res.data.map(item => item.id);
        this.wishlistIds.set(ids);
        this.wishlistProducts.set(res.data);
      })
    )
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistIds().includes(productId);
  }
}
