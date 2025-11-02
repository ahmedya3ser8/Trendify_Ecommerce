import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { IProduct } from '@core/models/iproduct';
import { ProductService } from '@core/services/product.service';
import { MainTitleComponent } from "@shared/components/main-title/main-title.component";
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";

@Component({
  selector: 'app-top-products',
  imports: [MainTitleComponent, ProductItemComponent, RouterLink],
  templateUrl: './top-products.component.html',
  styleUrl: './top-products.component.css'
})
export class TopProductsComponent {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  productList: WritableSignal<IProduct[]> = signal([]);
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productService.getAllProducts(8).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      }
    })
  }
}
