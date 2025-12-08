import { Routes } from '@angular/router';
import { productDetailsResolver } from '@core/resolvers/product-details.resolver';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products-list/products-list.component').then(c => c.ProductsListComponent)
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist.component').then(c => c.WishlistComponent)
  },
  {
    path: ':id',
    resolve: {
      product: productDetailsResolver
    },
    loadComponent: () => import('./pages/product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
];
