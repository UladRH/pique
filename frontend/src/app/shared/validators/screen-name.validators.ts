import { AbstractControl, ValidationErrors } from '@angular/forms';

import { RegexpUtils } from '../regexp.utils';

export class ScreenNameValidators {
  static pattern({ value }: AbstractControl): ValidationErrors | null {
    return !RegexpUtils.SCREEN_NAME.test(value) ? { pattern: true } : null;
  }

  static startsWithDot({ value }: AbstractControl): ValidationErrors | null {
    return value.startsWith('.') ? { startsWithDot: true } : null;
  }

  static endsWithDot({ value }: AbstractControl): ValidationErrors | null {
    return value.endsWith('.') ? { endsWithDot: true } : null;
  }

  static dotAppearConsecutively({ value }: AbstractControl): ValidationErrors | null {
    return RegexpUtils.DOT_APPEAR_CONSECUTIVELY.test(value)
      ? { dotAppearConsecutively: true }
      : null;
  }

  static disallowedCharacters({ value }: AbstractControl): ValidationErrors | null {
    return !RegexpUtils.WORD_DOT.test(value) ? { disallowedCharacters: true } : null;
  }
}
