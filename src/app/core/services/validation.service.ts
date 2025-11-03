import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  static matchValidator(filed: string, confirmField: string): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const control = formGroup.get(filed);
      const confirmControl = formGroup.get(confirmField);
      if (!control || !confirmControl) {
        return null;
      }
      if (control.value === confirmControl.value) {
        return null;
      } else {
        confirmControl.setErrors({ mismatch: true })
        return { mismatch: true };
      }
    }
  }
}
