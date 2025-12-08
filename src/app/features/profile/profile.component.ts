import { Component, signal } from '@angular/core';

import { ProfileFormComponent, ChangePasswordModalComponent } from "./components";

@Component({
  selector: 'app-profile',
  imports: [ProfileFormComponent, ChangePasswordModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  openChangePassModal = signal(false);
}
