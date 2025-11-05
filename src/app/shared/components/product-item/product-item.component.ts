import { Component, inject, input, InputSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

import { IProduct } from '@core/models/iproduct';
import { CartService } from '@features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  product: InputSignal<IProduct> = input.required();
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
        }
      }
    })
  }
}
