import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-online-shopping',
  imports: [],
  templateUrl: './online-shopping.component.html',
  styleUrl: './online-shopping.component.css'
})
export class OnlineShoppingComponent {
  reverse: InputSignal<boolean> = input(false);
  image: InputSignal<string> = input('');
  title: InputSignal<string> = input('');
}
