import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthSliderComponent } from "@shared/components/auth-slider/auth-slider.component";
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forget-password',
  imports: [AuthSliderComponent, BasicInputComponent, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  steps = signal<'forget' | 'otp' | 'reset'>('forget');
  forgetForm!: FormGroup;
  otpForm!: FormGroup;
  resetForm!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.otpForm  = this.fb.group({
      resetCode: ['', [Validators.required]]
    })
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]]
    })
  }
  submitForgetForm(): void {
    if (this.forgetForm.valid) {
      console.log(this.forgetForm.value);
      this.authService.forgetPassword(this.forgetForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          if (res.statusMsg === 'success') {
            this.toastrService.success(res.message);
            this.resetForm.get('email')?.setValue(this.forgetForm.value.email);
            this.steps.set('otp');
          }
        }
      })
    }
  }
  submitOtpForm(): void {
    if (this.otpForm.valid) {
      console.log(this.otpForm.value);
      this.authService.verifyCode(this.otpForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            console.log(res);
            this.steps.set('reset');
          }
        }
      })
    }
  }
  submitResetForm(): void {
    if (this.resetForm.valid) {
      console.log(this.resetForm.value);
      this.authService.resetPassword(this.resetForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigateByUrl('/auth/login');
        }
      })
    }
  }
}
