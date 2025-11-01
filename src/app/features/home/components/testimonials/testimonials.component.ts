import { Component, signal } from '@angular/core';
import { MainTitleComponent } from "@shared/components/main-title/main-title.component";

@Component({
  selector: 'app-testimonials',
  imports: [MainTitleComponent],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css'
})
export class TestimonialsComponent {
  testimonilasItems = signal([
    {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!',
      userName: 'Berry Gunawan',
      rate: 4.3
    },
    {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!',
      userName: 'Berry Gunawan',
      rate: 4.3
    },
    {
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio veritatis quam vitae voluptas illum!',
      userName: 'Berry Gunawan',
      rate: 4.3
    }
  ])
}
