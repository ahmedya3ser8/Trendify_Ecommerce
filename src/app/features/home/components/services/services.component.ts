import { Component, signal } from '@angular/core';

import { MainTitleComponent } from "@shared/components/main-title/main-title.component";

@Component({
  selector: 'app-services',
  imports: [MainTitleComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  servicesItems = signal([
    {
      icon: 'fa-regular fa-lightbulb text-2xl text-main-color',
      title: 'Inspiration',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis est, quod dicta eveniet ea itaque'
    },
    {
      icon: 'fa-solid fa-headphones text-2xl text-main-color',
      title: 'Inspiration',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis est, quod dicta eveniet ea itaque'
    },
    {
      icon: 'fa-solid fa-truck-fast text-2xl text-main-color',
      title: 'Inspiration',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis est, quod dicta eveniet ea itaque'
    }
  ])
}
