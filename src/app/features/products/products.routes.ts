import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./products-list/products-list.component').then(c => c.ProductsListComponent)
  },
  {
    path: 'fav',
    loadComponent: () => import('./fav-product/fav-product.component').then(c => c.FavProductComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./product-details/product-details.component').then(c => c.ProductDetailsComponent)
  },
];
