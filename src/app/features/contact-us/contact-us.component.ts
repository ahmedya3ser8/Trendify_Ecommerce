import { Component } from '@angular/core';

import { SubscriptionComponent } from "@shared/components/subscription/subscription.component";
import { ContactFormComponent } from "./components";

@Component({
  selector: 'app-contact-us',
  imports: [SubscriptionComponent, ContactFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {

}
