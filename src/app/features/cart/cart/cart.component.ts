import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CartItemComponent } from "@shared/components/cart-item/cart-item.component";
import { CartService } from '../services/cart.service';
import { ICart } from '@core/models/icart';

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cartDetails: WritableSignal<ICart> = signal({} as ICart);
  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  getLoggedUserCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res);
        this.cartDetails.set(res.data);
      }
    })
  }
  updateLoggedUserCart(e: any): void {
    console.log('updateLoggedUserCart', e);
    this.cartDetails.set(e.data);
  }
}
