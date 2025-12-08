import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { InputComponent } from "@features/auth/components";
import { isFieldInvalid } from '@shared/utils/invalid-field';
import { FloatLabel } from "primeng/floatlabel";
import { Select } from 'primeng/select';

interface ITopic {
  name: string;
  code: string;
}

@Component({
  selector: 'app-contact-form',
  imports: [InputComponent, ReactiveFormsModule, FloatLabel, Select],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
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
  isInvalid(field: string) {
    return isFieldInvalid(this.form, field)
  }
}
