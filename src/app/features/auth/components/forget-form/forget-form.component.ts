import { Component, DestroyRef, inject, OnInit, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@features/auth/services/auth.service';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-forget-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-form.component.html',
  styleUrl: './forget-form.component.css'
})
export class ForgetFormComponent implements OnInit {
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
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      this.authService.forgetPassword(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if (res.statusMsg === 'success') {
            this.toastrService.success(res.message);
            this.nextStep.emit();
          }
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
