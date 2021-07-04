import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginUserDto } from '../../shared/interfaces';
import * as AuthActions from '../state/auth.actions';
import * as fromAuth from '../state/auth.selectors';

@Component({
  selector: 'app-login-page',
  template: `
    <app-auth-page>
      <app-login-form
        (submitted)="onSubmit($event)"
        [pending]="pending$ | async"
        [error]="error$ | async"
      >
      </app-login-form>
    </app-auth-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  pending$ = this.store.select(fromAuth.selectLoginFormPending);
  error$ = this.store.select(fromAuth.selectLoginFormError);

  constructor(private readonly store: Store) {}

  onSubmit(dto: LoginUserDto) {
    this.store.dispatch(AuthActions.login({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.loginPageUnload());
  }
}
