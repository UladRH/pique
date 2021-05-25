import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ScreenNameValidators } from '../../shared/validators/screen-name.validators';
import { AuthFacade } from '../+state/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  errorSubscription: Subscription;

  constructor(private facade: AuthFacade, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    this.isSubmitting$ = this.facade.isSubmitting$;

    this.errorSubscription = this.facade.error$
      .pipe(filter((error) => error?.statusCode === 422))
      .subscribe(({ message }) => {
        if (message.includes('email already occupied')) {
          this.email.setErrors({ occupied: true });
        }
        if (message.includes('screenName already occupied')) {
          this.screenName.setErrors({ occupied: true });
        }
      });
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  submitForm(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }

    this.facade.register({
      screenName: this.screenName.value,
      email: this.email.value,
      password: this.password.value,
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
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
