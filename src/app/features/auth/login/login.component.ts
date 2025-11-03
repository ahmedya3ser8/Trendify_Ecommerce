import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";
import { AuthService } from '../services/auth.service';
import { AuthSliderComponent } from "@shared/components/auth-slider/auth-slider.component";
import { ToastrService } from 'ngx-toastr';

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
  private readonly cookieService = inject(CookieService);
  private readonly toastrService = inject(ToastrService);
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
      console.log(this.form.value);
      this.authService.login(this.form.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            console.log(res);
            this.cookieService.set('access_token', res.token);
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
