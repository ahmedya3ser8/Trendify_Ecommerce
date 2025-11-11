import { Component, inject, input, InputSignal } from '@angular/core';

import { ICartItem } from '@core/models/icart';
import { CartService } from '@features/cart/services/cart.service';

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  private readonly cartService = inject(CartService);
  product: InputSignal<ICartItem> = input({} as ICartItem);
  deleteCartItem(productId: string): void {
    this.cartService.removeSpecificCartItem(productId).subscribe();
  }
  updateProductQuantity(productId: string, count: number): void {
    this.cartService.updateCartProductQuantity(productId, count).subscribe()
  }
}
