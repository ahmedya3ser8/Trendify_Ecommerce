import { Component, input, InputSignal } from '@angular/core';

import { IProduct } from '@core/models/iproduct';

@Component({
  selector: 'app-product-item',
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  product: InputSignal<IProduct> = input.required();
}
