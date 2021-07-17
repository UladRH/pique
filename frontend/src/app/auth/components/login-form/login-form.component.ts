import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IError, RegisterUserDto } from '../../../shared/interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  @Input() pending: boolean = false;

  @Input() error: IError | null = null;

  @Output() submitted = new EventEmitter<RegisterUserDto>();

  validation = false;

  form: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  get email() {
    return this.form.get('email') as AbstractControl;
  }

  get password() {
    return this.form.get('password') as AbstractControl;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    } else {
      // enable validation after first unsuccessful submit
      this.validation = true;
    }
  }
}
