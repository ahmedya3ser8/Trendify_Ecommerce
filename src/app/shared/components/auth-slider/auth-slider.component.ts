import { afterNextRender, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auth-slider',
  imports: [],
  templateUrl: './auth-slider.component.html',
  styleUrl: './auth-slider.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthSliderComponent {
  @ViewChild('swiperAuth') swiperAuth!: ElementRef<HTMLElement>;
  itemsList = signal([
    '/images/auth/slider-1.png',
    '/images/auth/slider-2.png',
    '/images/auth/slider-3.png'
  ])
  constructor() {
    afterNextRender(() => {
      const swiperEl = this.swiperAuth.nativeElement as any;
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
}
