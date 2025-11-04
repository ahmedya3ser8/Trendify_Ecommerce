import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from "@angular/router";

import { IProduct } from '@core/models/iproduct';

@Component({
  selector: 'app-product-item',
  imports: [RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  product: InputSignal<IProduct> = input.required();
}
