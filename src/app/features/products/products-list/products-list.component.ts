import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AccordionModule } from 'primeng/accordion';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ProductService } from '@core/services/product.service';
import { IProduct } from '@core/models/iproduct';
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";
import { CategoryService } from '@core/services/category.service';
import { ICategory } from '@core/models/icategory';
import { EmptyStateComponent } from "@shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-products-list',
  imports: [AccordionModule, ProductItemComponent, PaginatorModule, EmptyStateComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  productList: WritableSignal<IProduct[]> = signal([]);
  categoryList: WritableSignal<ICategory[]> = signal([]);
  first: WritableSignal<number> = signal(1);
  rows: WritableSignal<number> = signal(12);
  total: WritableSignal<number> = signal(0);
  categoryId: WritableSignal<string> = signal('');
  categoryName: WritableSignal<string> = signal('All Products');
  openModal = signal(false);
  ngOnInit(): void {
    this.filterdProductsByCategoryId();
    this.getAllCategories();
  }
  filterdProductsByCategoryId(catId?: string): void {
    this.productService.getAllProducts(this.first(), this.rows(), catId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.total.set(res.results);
        this.productList.set(res.data);
      }
    })
  }
  getAllCategories(): void {
    this.categoryService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      }
    })
  }
  onPageChange(event: PaginatorState) {
    this.first.set(event.page ?? 0);
    this.rows.set(event.rows ?? 12);
    this.filterdProductsByCategoryId();
  }
  selectedCatId(catId: string, catName: string): void {
    this.categoryId.set(catId);
    this.categoryName.set(catName)
    if (catId === '') {
      this.filterdProductsByCategoryId();
    } else {
      this.filterdProductsByCategoryId(catId);
    }
  }
  toggleModal(): void {
    this.openModal.update(v => !v);
  }
  closeModal(): void {
    this.openModal.set(false);
  }
}
