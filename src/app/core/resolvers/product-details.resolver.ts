import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ProductService } from '@core/services/product.service';
import { IProduct } from '@core/models/iproduct';

export const productDetailsResolver: ResolveFn<{data: IProduct}> = (route, state) => {
  const productService = inject(ProductService);
  return productService.getSpecificProduct(route.paramMap.get('id') as string);
};
