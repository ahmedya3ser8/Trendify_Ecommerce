import { Routes } from '@angular/router';

import { AccountComponent } from './account.component';

export const accountRoutes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(c => c.ProfileComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./orders/orders.component').then(c => c.OrdersComponent)
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./order-details/order-details.component').then(c => c.OrderDetailsComponent)
      },
    ]
  }
];
