import { Component, inject, input, InputSignal, output } from '@angular/core';

import { ICart } from '@core/models/icart';
import { IProduct } from '@core/models/iproduct';
import { CartService } from '@features/cart/services/cart.service';

interface ICartItem {
  count: number;
  price: number;
  product: IProduct;
  _id: string;
}

interface IResponse {
  cartId: string;
  message: string;
  status: string;
  numOfCartItems: number;
  data: ICart
}

@Component({
  selector: 'app-cart-item',
  imports: [],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.css'
})
export class CartItemComponent {
  private readonly cartService = inject(CartService);
  product: InputSignal<ICartItem> = input({} as ICartItem);
  updateUserCart = output<IResponse>();
  deleteCartItem(productId: string): void {
    console.log(productId);
    this.cartService.removeSpecificCartItem(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.updateUserCart.emit(res);
      }
    })
  }
  updateProductQuantity(productId: string, count: number): void {
    this.cartService.updateCartProductQuantity(productId, count).subscribe({
      next: (res) => {
        console.log(res);
        this.updateUserCart.emit(res);
      }
    })
  }
}
