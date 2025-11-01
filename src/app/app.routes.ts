import { Routes } from '@angular/router';

import { AuthLayoutsComponent } from '@core/layouts/auth-layouts/auth-layouts.component';
import { MainLayoutsComponent } from '@core/layouts/main-layouts/main-layouts.component';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthLayoutsComponent,
    loadChildren: () => import('./features/auth/auth.routes').then(r => r.authRoutes)
  },
  {
    path: '',
    component: MainLayoutsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'about-us',
        loadComponent: () => import('./features/about-us/about-us.component').then(c => c.AboutUsComponent)
      },
      {
        path: 'contact-us',
        loadComponent: () => import('./features/contact-us/contact-us.component').then(c => c.ContactUsComponent)
      },
      {
        path: 'blog',
        loadComponent: () => import('./features/blog/blog.component').then(c => c.BlogComponent)
      },
      {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart.routes').then(r => r.cartRoutes)
      },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(r => r.productsRoutes)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
