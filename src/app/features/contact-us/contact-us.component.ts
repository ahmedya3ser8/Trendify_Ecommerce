import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { SubscriptionComponent } from "@shared/components/subscription/subscription.component";

interface ITopic {
  name: string;
  code: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [Select, FloatLabel, ReactiveFormsModule, SubscriptionComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  topics: ITopic[] = [];
  form!: FormGroup;
  ngOnInit(): void {
    this.initTopics();
    this.initForm();
  }
  initTopics(): void {
    this.topics = [
      { name: 'select one', code: 'option1' },
      { name: 'select two', code: 'option2' },
      { name: 'select three', code: 'option3' }
    ];
  }
  initForm(): void {
    this.form = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      topic: [null, [Validators.required]],
      message: [null, [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    })
  }
  submitForm(): void {
    console.log(this.form.value);
  }
}
