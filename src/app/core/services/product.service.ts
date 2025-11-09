import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IProduct } from '@core/models/iproduct';
import { BASE_URL } from '@core/tokens/api-url.token';

interface IResponse {
  data: IProduct[],
  metadata: {
    currentPage: number,
    limit: number,
    numberOfPages: number
  },
  results: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = inject(BASE_URL);
  getAllProducts(page: number = 1, limit: number = 4, categoryId?: string): Observable<IResponse> {
    let params: any = { limit, page };
    if (categoryId) {
      params['category[in]'] = categoryId;
    }
    return this.http.get<IResponse>(`${this.BASE_URL}/api/v1/products`, { params })
  }
  getSpecificProduct(productId: string): Observable<{data: IProduct}> {
    return this.http.get<{data: IProduct}>(`${this.BASE_URL}/api/v1/products/${productId}`)
  }
}
