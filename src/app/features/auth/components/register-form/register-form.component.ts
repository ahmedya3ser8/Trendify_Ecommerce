import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ValidationService } from '@core/services/validation.service';
import { InputComponent } from "@features/auth/components";
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-register-form',
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {
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
      this.authService.register(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
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
