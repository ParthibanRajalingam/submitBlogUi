import { AbstractControl } from '@angular/forms';

export class Validations {
    ValidateEmail(control: AbstractControl) {
  if (!control.value.includes('@') || !control.value.includes('.com')) {
    return { notValidUrl: true };
  }
  return null;
}
}
