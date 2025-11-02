import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '@core/models/iproduct';
import { Observable } from 'rxjs';

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
  getAllProducts(limit: number = 4, categoryId?: string): Observable<IResponse> {
    let params: any = { limit: limit.toString() };
    if (categoryId) {
      params['category[in]'] = categoryId;
    }
    return this.http.get<IResponse>(`https://ecommerce.routemisr.com/api/v1/products`, { params })
  }
}
