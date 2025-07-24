import { FormControl } from '@angular/forms';
import { phoneNumberValidator } from './phone-number.validator';

describe('phoneNumberValidator', () => {
  const validator = phoneNumberValidator();

  const testData: [string, string, null | { invalidPhone: true }][] = [
    ['valid 9-digit phone number', '123456789', null],
    ['valid phone number with +48 prefix', '+48123456789', null],
    ['valid phone number with 0048 prefix', '0048123456789', null],
    ['too short phone number', '12345', { invalidPhone: true }],
    ['too long phone number', '1234567890123', { invalidPhone: true }],
    ['phone number with letters', '+48123abc89', { invalidPhone: true }],
    ['completely invalid input', 'abc', { invalidPhone: true }],
  ];

  testData.forEach(([description, input, expected]) => {
    it(`should return correct result for ${description}`, () => {
      const control = new FormControl(input);
      expect(validator(control)).toEqual(expected);
    });
  });
});
