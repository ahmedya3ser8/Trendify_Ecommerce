import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'checkout/:id',
    loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
];
