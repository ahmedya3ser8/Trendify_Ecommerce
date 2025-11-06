import { afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '@core/models/iproduct';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductItemComponent } from "@shared/components/product-item/product-item.component";

@Component({
  selector: 'app-product-details',
  imports: [ProductItemComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  @ViewChild('swiperProductimgs') swiperProductimgs!: ElementRef<HTMLElement>;
  product: WritableSignal<IProduct> = signal({} as IProduct);
  productList: WritableSignal<IProduct[]> = signal([]);
  constructor() {
    afterNextRender(() => {
      const swiperEl = this.swiperProductimgs.nativeElement as any;
      Object.assign(swiperEl, {
        slidesPerView: 1,
        speed: 700,
        simulateTouch: true,
        allowTouchMove: true,
        loop: true,
        lazy: true,
        autoplay: { delay: 2000, disableOnInteraction: false , pauseOnMouseEnter: true},
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        }
      });
      swiperEl.initialize();
    })
  }
  ngOnInit(): void {
    this.getSpecificProduct();
  }
  getSpecificProduct(): void {
    this.activatedRoute.data.subscribe({
      next: ({product}) => {
        console.log(product.data);
        this.product.set(product.data);
        console.log(product.data.category._id);
        this.productService.getAllProducts(1, 4, product.data.category._id).subscribe({
          next: (res) => {
            console.log(res.data);
            this.productList.set(res.data);
          }
        })
      }
    })
  }
  rateAvg(rate: number) {
    return Math.floor(rate)
  }
  addToCart(productId: string): void {
    this.cartService.addProductToCart(productId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success(res.message);
          this.cartService.getLoggedUserCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
        }
      }
    })
  }

}
