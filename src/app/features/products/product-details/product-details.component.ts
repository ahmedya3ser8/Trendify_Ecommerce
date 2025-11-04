import { afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProduct } from '@core/models/iproduct';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  @ViewChild('swiperProductimgs') swiperProductimgs!: ElementRef<HTMLElement>;
  product: WritableSignal<IProduct> = signal({} as IProduct);
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
      }
    })
  }
  rateAvg(rate: number) {
    return Math.floor(rate)
  }
}
