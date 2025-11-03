import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Select } from 'primeng/select';
import { FloatLabel } from "primeng/floatlabel"
import { SubscriptionComponent } from "@shared/components/subscription/subscription.component";
import { BasicInputComponent } from "@shared/components/basic-input/basic-input.component";

interface ITopic {
  name: string;
  code: string;
}

@Component({
  selector: 'app-contact-us',
  imports: [Select, FloatLabel, ReactiveFormsModule, SubscriptionComponent, BasicInputComponent],
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      topic: [null, [Validators.required]],
      message: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    })
  }
  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }
  isFieldInvalid(field: string): boolean {
    const control: AbstractControl | null = this.form.get(field);
    return !!(control?.errors && control?.touched);
  }
}
