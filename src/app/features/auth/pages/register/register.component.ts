import { Component } from '@angular/core';

import { RegisterFormComponent, AuthSliderComponent } from '@features/auth/components';

@Component({
  selector: 'app-register',
  imports: [AuthSliderComponent, RegisterFormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
