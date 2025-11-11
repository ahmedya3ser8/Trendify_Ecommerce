import { DatePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { IOrder } from '@core/models/iorder';

@Component({
  selector: 'app-order-details',
  imports: [DatePipe, RouterLink],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {
  private readonly router = inject(Router);
  order: WritableSignal<IOrder> = signal({} as IOrder);
  constructor() {
    this.order.set(this.router.getCurrentNavigation()?.extras.state?.['order'] || null);
  }
}
