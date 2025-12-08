import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@features/auth/services/auth.service';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-otp-form',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './otp-form.component.html',
  styleUrl: './otp-form.component.css'
})
export class OtpFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService);
  nextStep = output<void>();
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void {
    this.form  = this.fb.group({
      resetCode: ['', [Validators.required]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      this.authService.verifyCode(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.status === 'Success') {
            this.toastrService.success('Great! Your verification was successful.');
            this.nextStep.emit();
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
