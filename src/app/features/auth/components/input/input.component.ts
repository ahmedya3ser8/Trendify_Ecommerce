import { Component, forwardRef, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  value!: string;
  flag = signal<boolean>(false);
  label = input.required<string>();
  id = input.required<string>();
  type = input<string>();
  control = input<AbstractControl | null>(null);
  errors = input<{[key: string]: string}>({});
  maskPassword = input<boolean>(false);
  readonly = input<boolean>(false);

  onChange: (value: string) => void = () => {}
  onTouched: () => void = () => {}
  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  get objectKeys() {
    return Object.keys(this.errors());
  }
  togglePassword(): void {
    this.flag.update(v => !v);
  }
}
