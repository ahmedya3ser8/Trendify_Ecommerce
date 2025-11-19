import { afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ICategory } from '@core/models/icategory';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  @ViewChild('swiperCategories') swiperCategories!: ElementRef<HTMLElement>;
  categoryList: WritableSignal<ICategory[]> = signal([]);
  breakpoints = {
    400:  { slidesPerView: 3, spaceBetween: 10 },
    768:  { slidesPerView: 4, spaceBetween: 15 },
    1024: { slidesPerView: 6, spaceBetween: 20 },
    1280: { slidesPerView: 8, spaceBetween: 25 }
  };
  constructor() {
    afterNextRender(() => {
      const swiperEl = this.swiperCategories.nativeElement as any;
      Object.assign(swiperEl, {
        speed: 700,
        slidesPerView: 2,
        simulateTouch: true,
        allowTouchMove: true,
        loop: true,
        lazy: true,
        breakpoints: this.breakpoints,
        autoplay: { delay: 2000, disableOnInteraction: false , pauseOnMouseEnter: true}
      });
      swiperEl.initialize();
    })
  }
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoryService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      }
    })
  }
}
