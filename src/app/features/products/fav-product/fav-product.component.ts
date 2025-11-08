import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ProductItemComponent } from "@shared/components/product-item/product-item.component";
import { WishlistService } from './services/wishlist.service';
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-fav-product',
  imports: [ProductItemComponent, RouterLink, EmptyStateComponent],
  templateUrl: './fav-product.component.html',
  styleUrl: './fav-product.component.css'
})
export class FavProductComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly destroyRef = inject(DestroyRef);
  wishlistList = this.wishlistService.wishlistProducts;
  ngOnInit(): void {
    this.wishlistService.getLoggedUserWishlist().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
