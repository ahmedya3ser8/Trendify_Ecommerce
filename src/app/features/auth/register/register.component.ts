import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

import { ValidationService } from '@core/services/validation.service';
import { AuthSliderComponent } from "@shared/components/auth-slider/auth-slider.component";
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-register',
  imports: [BasicInputComponent, ReactiveFormsModule, RouterLink, AuthSliderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly destroyRef = inject(DestroyRef);
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]],
      rePassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    }, { validators: [ValidationService.matchValidator('password', 'rePassword')] })
  }
  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.register(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.toastrService.success('Account created successfully! Glad to have you with us.')
            this.router.navigateByUrl('/auth/login');
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
