import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  imports: [],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.css'
})
export class EmptyStateComponent {
  image: InputSignal<string> = input.required();
  title: InputSignal<string> = input.required();
}
