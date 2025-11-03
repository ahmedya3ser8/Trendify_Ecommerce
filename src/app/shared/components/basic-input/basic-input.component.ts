import { Component, forwardRef, input, InputSignal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-basic-input',
  imports: [],
  templateUrl: './basic-input.component.html',
  styleUrl: './basic-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BasicInputComponent),
      multi: true
    }
  ]
})
export class BasicInputComponent implements ControlValueAccessor {
  label: InputSignal<string> = input.required<string>();
  type: InputSignal<string> = input<string>('text');
  id: InputSignal<string> = input.required<string>();
  control: InputSignal<AbstractControl | null> = input<AbstractControl | null>(null);
  errors: InputSignal<{ [key: string]: string }> = input<{ [key: string]: string }>({});
  value!: string;
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
}
