import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { IUserInfo } from '@core/models/iuser';
import { ValidationService } from '@core/services/validation.service';
import { AuthService } from '@features/auth/services/auth.service';
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  imports: [BasicInputComponent, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  userInfo!: IUserInfo;
  openModal = signal(false);
  profileform!: FormGroup;
  changePasswordForm!: FormGroup;
  ngOnInit(): void {
    this.userInfo = JSON.parse(this.cookieService.get('userInfo'));
    this.initForm();
  }
  initForm(): void {
    this.profileform = this.fb.group({
      name: [this.userInfo.name, [Validators.required]],
      email: [this.userInfo.email, [Validators.required, Validators.email]],
      password: ['Ahmed123456', [Validators.required]],
      phone: ['01055151452', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    });
    this.changePasswordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9@#$]{6,}$/)]],
      rePassword: [null, [Validators.required]]
    }, { validators: [ValidationService.matchValidator('password', 'rePassword')] })
  }
  submitProfileForm(): void {
    if (this.profileform.valid) {
      const { password, ...obj } = this.profileform.value;
      this.authService.updateLoggedUserData(obj).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.toastrService.success('user info updated successfully')
        }
      });
    } else {
      this.profileform.markAllAsTouched();
    }
  }
  submitChangePasswordForm(): void {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      this.authService.updateLoggedUserPassword(this.changePasswordForm.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.closeModal();
          }
        }
      })
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
  toggleModal(): void {
    this.openModal.update(v => !v);
  }
  closeModal(): void {
    this.openModal.set(false);
    this.changePasswordForm.reset();
  }
}
