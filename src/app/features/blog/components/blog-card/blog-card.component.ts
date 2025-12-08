import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { IBlog } from '@features/blog/models/iblog';

@Component({
  selector: 'app-blog-card',
  imports: [DatePipe],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.css'
})
export class BlogCardComponent {
  blog = input.required<IBlog>();
}
