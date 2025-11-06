import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOrder } from '@core/models/iorder';

interface ICashOrderResponse {
  status: string;
  data: IOrder
}

interface IOnlineOrderResponse {
  status: string;
  session: {
    cancel_url: string;
    success_url: string;
    url: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly http = inject(HttpClient);
  cashOrder(cartId: string, data: object): Observable<ICashOrderResponse> {
    return this.http.post<ICashOrderResponse>(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      shippingAddress: data
    })
  }
  onlineOrder(cartId: string, data: object): Observable<IOnlineOrderResponse> {
    return this.http.post<IOnlineOrderResponse>(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`, {
      shippingAddress: data
    })
  }
}
