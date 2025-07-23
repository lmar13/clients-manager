import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  const regex = /^(?:\+48|0048)?\d{9}$/;
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.toString().trim();
    if (!value) return null;
    return regex.test(value) ? null : { invalidPhone: true };
  };
}
