import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICategory } from '@core/models/icategory';
import { Observable } from 'rxjs';

interface IResponse {
  data: ICategory[],
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
export class CategoryService {
  private readonly http = inject(HttpClient);
  getAllCategories(): Observable<IResponse> {
    return this.http.get<IResponse>(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
}
