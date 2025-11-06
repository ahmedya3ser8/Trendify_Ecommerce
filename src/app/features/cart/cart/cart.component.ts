import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { CartItemComponent } from "@shared/components/cart-item/cart-item.component";
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
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
