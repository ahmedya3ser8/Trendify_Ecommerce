import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '@core/services/validation.service';
import { InputComponent } from "@features/auth/components";
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-change-password-modal',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './change-password-modal.component.html',
  styleUrl: './change-password-modal.component.css'
})
export class ChangePasswordModalComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  closeModal = output<void>();
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]],
      rePassword: [null, [Validators.required]]
    }, { validators: [ValidationService.matchValidator('password', 'rePassword')] })
  }
  submitForm(): void {
    if (this.form.valid) {
      this.authService.updateLoggedUserPassword(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.closeModal.emit();
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
