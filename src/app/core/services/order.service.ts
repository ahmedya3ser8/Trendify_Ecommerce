import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IOrder } from '@core/models/iorder';
import { BASE_URL, CHECKOUT_URL } from '@core/tokens/api-url.token';

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
  private readonly BASE_URL = inject(BASE_URL);
  private readonly CHECKOUT_URL = inject(CHECKOUT_URL);
  cashOrder(cartId: string, data: object): Observable<ICashOrderResponse> {
    return this.http.post<ICashOrderResponse>(`${this.BASE_URL}/api/v1/orders/${cartId}`, {
      shippingAddress: data
    })
  }
  onlineOrder(cartId: string, data: object): Observable<IOnlineOrderResponse> {
    return this.http.post<IOnlineOrderResponse>(`${this.BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${this.CHECKOUT_URL}`, {
      shippingAddress: data
    })
  }
  getUserOrders(userId: string): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.BASE_URL}/api/v1/orders/user/${userId}`);
  }
}
