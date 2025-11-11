import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { IOrder } from '@core/models/iorder';
import { OrderService } from '@core/services/order.service';
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly orderService = inject(OrderService);
  private readonly destroyRef = inject(DestroyRef);
  ordersList: WritableSignal<IOrder[]> = signal([]);
  ngOnInit(): void {
    this.orderService.getUserOrders(this.authService.userId()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.ordersList.set(res)
      }
    })
  }
}
