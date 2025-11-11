import { Component, DestroyRef, inject, input, InputSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from "@angular/router";

import { IProduct } from '@core/models/iproduct';
import { CartService } from '@features/cart/services/cart.service';
import { WishlistService } from '@features/products/fav-product/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  product: InputSignal<IProduct> = input.required();
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
      }
    })
  }
  toggleWishlist(productId: string): void {
    if (this.isInWishlist(productId)) {
      this.wishlistService.removeFromWishlist(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.toastrService.info(res.message);
          this.wishlistService.getLoggedUserWishlist().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
      })
    } else {
      this.wishlistService.addToWishlist(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          this.toastrService.success(res.message);
          this.wishlistService.getLoggedUserWishlist().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
      })
    }
  }
  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }
}
