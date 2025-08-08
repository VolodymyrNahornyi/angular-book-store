import { FormControl } from '@angular/forms';
import {CustomValidator} from "./CustomValidator";

describe('CustomValidator.noSpaceAllowed', () => {

  it('should return error object if value contains space', () => {
    const control = new FormControl('test value');
    const result = CustomValidator.noSpaceAllowed(control);
    expect(result).toEqual({ noSpaceAllowed: true });
  });

  it('should return null if value does not contain space', () => {
    const control = new FormControl('testvalue');
    const result = CustomValidator.noSpaceAllowed(control);
    expect(result).toBeNull();
  });

  it('should return null if value is null', () => {
    const control = new FormControl(null);
    const result = CustomValidator.noSpaceAllowed(control);
    expect(result).toBeNull();
  });

});
