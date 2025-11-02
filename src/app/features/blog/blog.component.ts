import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-blog',
  imports: [DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogList = signal([
    {
      image: '/images/blogs/blog-1.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    },
    {
      image: '/images/blogs/blog-2.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    },
    {
      image: '/images/blogs/blog-3.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    },
    {
      image: '/images/blogs/blog-4.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    },
    {
      image: '/images/blogs/blog-5.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    },
    {
      image: '/images/blogs/blog-6.png',
      category: 'Fashion',
      date: new Date(),
      title: 'The perfect Shopify theme',
      description: 'Shopify is the second most popular eCommerce store builder in the world. You can use Shopify in...'
    }
  ])
}
