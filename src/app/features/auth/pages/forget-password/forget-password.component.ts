import { Component, signal } from '@angular/core';

import {
  AuthSliderComponent,
  ForgetFormComponent,
  OtpFormComponent,
  ResetFormComponent
} from '@features/auth/components';

@Component({
  selector: 'app-forget-password',
  imports: [AuthSliderComponent, ForgetFormComponent, OtpFormComponent, ResetFormComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  steps = signal<'forget' | 'otp' | 'reset'>('forget');
  email = signal<string>('');
  otpStep(event: string): void {
    console.log(event);
    this.email.set(event);
    this.steps.set('otp');
  }
  resetStep(event: string): void {
    console.log(event);
    this.email.set(event);
    this.steps.set('reset')
  }
}
