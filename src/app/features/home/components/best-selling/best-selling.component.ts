import { Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

import { IProduct } from '@core/models/iproduct';
import { ProductService } from '@core/services/product.service';
import { MainTitleComponent } from "@shared/components/main-title/main-title.component";
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";

@Component({
  selector: 'app-best-selling',
  imports: [MainTitleComponent, ProductItemComponent, RouterLink],
  templateUrl: './best-selling.component.html',
  styleUrl: './best-selling.component.css'
})
export class BestSellingComponent {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  productList: WritableSignal<IProduct[]> = signal([]);
  categoryId: WritableSignal<string> = signal('');
  categoryList = signal([
    {
      catId: "",
      catName: "All"
    },
    {
      catId: "6439d5b90049ad0b52b90048",
      catName: "Men's"
    },
    {
      catId: "6439d58a0049ad0b52b9003f",
      catName: "Women's"
    },
    {
      catId: "6439d2d167d9aa4ca970649f",
      catName: "Electronics"
    },
  ])
  ngOnInit(): void {
    this.filterdProductsByCategoryId('6439d58a0049ad0b52b9003f');
  }
  selectedCategroyId(catId: string): void {
    console.log(catId);
    this.categoryId.set(catId);
    if (catId === '') {
      this.filterdProductsByCategoryId('6439d58a0049ad0b52b9003f');
    } else {
      this.filterdProductsByCategoryId(catId);
    }
  }
  filterdProductsByCategoryId(catId: string): void {
    this.productService.getAllProducts(4, catId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      }
    })
  }
}
