import { CustomValidators } from './castom-validators';
import { FormControl } from '@angular/forms';

describe('CustomValidators', (): void => {
  describe('speedDurationRangeValidator', () => {
    const control = new FormControl(2000);
    const min: number = 1;
    const max: number = 10000;
    const expectedError = { speedDurationRangeValidator: true };

    it('should return null if speed duration passes validation', (): void => {
      control.setValue(3000);

      expect(
        CustomValidators.speedDurationRangeValidator(min, max)(control),
      ).toEqual(null);
    });

    it('should return error if speed duration does not passes validation - 1', (): void => {
      control.setValue(0);

      expect(
        CustomValidators.speedDurationRangeValidator(min, max)(control),
      ).toEqual(expectedError);
    });

    it('should return error if speed duration does not passes validation - 2', (): void => {
      control.setValue(10001);

      expect(
        CustomValidators.speedDurationRangeValidator(min, max)(control),
      ).toEqual(expectedError);
    });
  });
});
