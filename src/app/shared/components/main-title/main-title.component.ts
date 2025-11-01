import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-main-title',
  imports: [],
  templateUrl: './main-title.component.html',
  styleUrl: './main-title.component.css'
})
export class MainTitleComponent {
  title: InputSignal<string> = input('');
  description: InputSignal<string> = input('');
}
