import { Component, DestroyRef, inject, OnInit, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

import { IUserInfo } from '@core/models/iuser';
import { InputComponent } from "@features/auth/components";
import { AuthService } from '@features/auth/services/auth.service';

@Component({
  selector: 'app-profile-form',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit {
private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly toastrService = inject(ToastrService);
  userInfo!: IUserInfo;
  openModal = output<void>();
  form!: FormGroup;
  ngOnInit(): void {
    this.userInfo = JSON.parse(this.cookieService.get('userInfo'));
    this.initForm();
  }
  initForm(): void {
    this.form = this.fb.group({
      name: [this.userInfo.name, [Validators.required]],
      email: [this.userInfo.email, [Validators.required, Validators.email]],
      password: ['Ahmed123456', [Validators.required]],
      phone: ['01055151452', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    });
  }
  submitForm(): void {
    if (this.form.valid) {
      const { password, ...obj } = this.form.value;
      this.authService.updateLoggedUserData(obj).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: () => {
          this.toastrService.success('user info updated successfully')
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
