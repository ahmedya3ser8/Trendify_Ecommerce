import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  date: Date = new Date();
  year = this.date.getFullYear();
  menuItems = signal([
    {
      label: 'About Us',
      items: [
        {
          text: 'FAQ',
          link: ''
        },
        {
          text: 'Contact',
          link: ''
        },
        {
          text: 'Returns',
          link: ''
        },
        {
          text: 'Blog',
          link: ''
        },
        {
          text: 'Shipping',
          link: ''
        }
      ]
    },
    {
      label: 'Customer Support',
      items: [
        {
          text: 'Affiliates',
          link: ''
        },
        {
          text: 'Apply Pay Payments',
          link: ''
        },
        {
          text: 'Returns',
          link: ''
        },
        {
          text: 'Returns Policy',
          link: ''
        },
        {
          text: 'Returns',
          link: ''
        }
      ]
    }
  ])
}
