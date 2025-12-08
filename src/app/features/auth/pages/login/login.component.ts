import { Component } from '@angular/core';

import { AuthSliderComponent, LoginFormComponent } from '@features/auth/components';

@Component({
  selector: 'app-login',
  imports: [AuthSliderComponent, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
