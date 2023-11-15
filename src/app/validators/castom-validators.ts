import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static speedDurationRangeValidator(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (
        c.value !== undefined &&
        (Number.isNaN(c.value) || c.value < min || c.value > max)
      ) {
        return {
          speedDurationRangeValidator: true,
        };
      }
      return null;
    };
  }
}
