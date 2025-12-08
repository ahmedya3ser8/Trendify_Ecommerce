import { Component, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@features/auth/services/auth.service';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-reset-form',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './reset-form.component.html',
  styleUrl: './reset-form.component.css'
})
export class ResetFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      this.authService.resetPassword(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.toastrService.success('Your password has been reset successfully.');
          this.router.navigateByUrl('/auth/login');
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
