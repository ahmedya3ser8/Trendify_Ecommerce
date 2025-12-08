import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InputComponent } from "@features/auth/components";
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, RouterLink, InputComponent],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.toastrService.success('Welcome back! You’ve logged in successfully.')
            this.router.navigateByUrl('/home');
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
