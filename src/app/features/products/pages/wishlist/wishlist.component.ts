import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { WishlistService } from '@features/products/services/wishlist.service';
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state.component";
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";

@Component({
  selector: 'app-wishlist',
  imports: [EmptyStateComponent, ProductItemComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly destroyRef = inject(DestroyRef);
  wishlistList = this.wishlistService.wishlistProducts;
  ngOnInit(): void {
    this.wishlistService.getLoggedUserWishlist().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
