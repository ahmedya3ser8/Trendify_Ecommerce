import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  imgList = signal([
    '/images/about-us/fashion-1.jpg',
    '/images/about-us/fashion-2.webp',
    '/images/about-us/fashion-3.webp',
    '/images/about-us/fashion-4.webp',
    '/images/about-us/fashion-5.jpg'
  ])
}
