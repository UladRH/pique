import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ScreenNameValidators } from '@pique/frontend/shared/validators';
import { IError, RegisterUserDto } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  @Output() submitted = new EventEmitter<RegisterUserDto>();

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

  @Input() set pending(pending: boolean | null) {
    if (pending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() set error(err: IError | null) {
    if (err?.statusCode === 422) {
      if (err?.message.includes('email already occupied')) {
        this.email?.setErrors({ occupied: true });
      }

      if (err?.message.includes('screenName already occupied')) {
        this.screenName?.setErrors({ occupied: true });
      }
    }
  }

  get screenName() {
    return this.form.get('screenName') as AbstractControl;
  }

  get email() {
    return this.form.get('email') as AbstractControl;
  }

  get password() {
    return this.form.get('password') as AbstractControl;
  }

  submit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
