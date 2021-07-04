import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IError, RegisterUserDto } from '../../../shared/interfaces';
import { ScreenNameValidators } from '../../../shared/validators/screen-name.validators';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Input()
  pending: boolean;

  @Input()
  set error(err: IError | null) {
    if (err?.statusCode === 422) {
      if (err?.message.includes('email already occupied')) {
        this.email.setErrors({ occupied: true });
      }

      if (err?.message.includes('screenName already occupied')) {
        this.screenName.setErrors({ occupied: true });
      }
    }
  }

  @Output() submitted: EventEmitter<RegisterUserDto> = new EventEmitter();

  form: FormGroup = this.formBuilder.group({
    screenName: [
      '',
      [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25),
        ScreenNameValidators.pattern,
        ScreenNameValidators.startsWithDot,
        ScreenNameValidators.endsWithDot,
        ScreenNameValidators.dotAppearConsecutively,
        ScreenNameValidators.disallowedCharacters,
      ],
    ],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }

  get screenName(): AbstractControl {
    return this.form.get('screenName');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}
