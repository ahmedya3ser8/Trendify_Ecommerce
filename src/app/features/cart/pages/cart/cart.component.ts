import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { CartItemComponent } from "@shared/components/cart-item/cart-item.component";
import { CartService } from '@features/cart/services/cart.service';
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly destroyRef = inject(DestroyRef);
  cartDetails = this.cartService.cart;;
  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
