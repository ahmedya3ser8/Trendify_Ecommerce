import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProductService } from '@core/services/product.service';
import { IProduct } from '@core/models/iproduct';
import { MainTitleComponent } from "@shared/components/main-title/main-title.component";
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";

@Component({
  selector: 'app-flash-sale',
  imports: [MainTitleComponent, ProductItemComponent, RouterLink],
  templateUrl: './flash-sale.component.html',
  styleUrl: './flash-sale.component.css'
})
export class FlashSaleComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  productList: WritableSignal<IProduct[]> = signal([]);
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productService.getAllProducts().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      }
    })
  }
}
