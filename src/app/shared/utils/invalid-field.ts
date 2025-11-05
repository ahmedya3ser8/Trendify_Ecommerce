import { AbstractControl, FormGroup } from "@angular/forms";

export function isFieldInvalid(form: FormGroup, field: string): boolean {
  const control: AbstractControl | null = form.get(field);
  return !!(control?.errors && control?.touched);
}
