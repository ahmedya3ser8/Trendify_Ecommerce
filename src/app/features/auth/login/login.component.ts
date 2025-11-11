import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthSliderComponent } from "@shared/components/auth-slider/auth-slider.component";
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [BasicInputComponent, ReactiveFormsModule, RouterLink, AuthSliderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
