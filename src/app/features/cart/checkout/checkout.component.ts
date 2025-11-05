import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { isFieldInvalid } from '@shared/utils/invalid-field';

@Component({
  selector: 'app-checkout',
  imports: [BasicInputComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  payment: WritableSignal<string> = signal('online');
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      details: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: [null, [Validators.required]]
    })
  }
  submitForm(): void {
    if (this.payment() === 'online') {
      console.log('online');
      console.log(this.form.value);
    } else {
      console.log('cash');
      console.log(this.form.value);
    }
  }
  paymentMethod(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.payment.set(input.value);
  }
  isInvalid(field: string) {
    return isFieldInvalid(this.form, field)
  }
}
