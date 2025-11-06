import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { OrderService } from '@core/services/order.service';
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { isFieldInvalid } from '@shared/utils/invalid-field';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [BasicInputComponent, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly orderService = inject(OrderService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cartService = inject(CartService);
  payment: WritableSignal<string> = signal('online');
  cartId: WritableSignal<string> = signal('');
  cartDetails = this.cartService.cart;
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }
  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (url) => {
        console.log(url.get('id'));
        this.cartId.set(url.get('id') as string);
      }
    })
  }
  initForm(): void {
    this.form = this.fb.group({
      details: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      city: ['', [Validators.required]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      if (this.payment() === 'online') {
        this.onlineOrder();
      } else if (this.payment() === 'cash') {
        this.cashOrder();
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
  cashOrder(): void {
    this.orderService.cashOrder(this.cartId(), this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastrService.success('order completed successfully');
          timer(1500).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.router.navigateByUrl('/account/allorders'));
        }
      }
    })
  }
  onlineOrder(): void {
    this.orderService.onlineOrder(this.cartId(), this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          open(res.session.url, '_self');
        }
      }
    })
  }
  paymentMethod(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.payment.set(input.value);
  }
  isInvalid(field: string) {
    return isFieldInvalid(this.form, field)
  }
}
