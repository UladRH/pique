import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  isIncorrectCredentials$: Observable<boolean>;
  useValidation$ = new BehaviorSubject<boolean>(false);

  constructor(private facade: AuthFacade, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    this.isSubmitting$ = this.facade.isSubmitting$;

    this.isIncorrectCredentials$ = this.facade.error$.pipe(map((error) => !!error));
  }

  submitForm(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      // enable validation after first unsuccessful submit
      this.useValidation$.next(true);
      return;
    }

    this.facade.login({
      email: this.email.value,
      password: this.password.value,
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }
}
