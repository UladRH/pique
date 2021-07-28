import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IError, LoginUserDto } from '../../core/interfaces';
import * as AuthActions from '../../features/auth/state/auth.actions';
import * as fromAuth from '../../features/auth/state/auth.selectors';

@Component({
  template: `
    <app-auth-page-layout>
      <app-login-form
        (submitted)="onSubmit($event)"
        [pending]="!!(pending$ | async)"
        [error]="error$ | async"
      >
      </app-login-form>
    </app-auth-page-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent implements OnDestroy {
  pending$: Observable<boolean>;
  error$: Observable<IError | null>;

  constructor(private readonly store: Store) {
    this.pending$ = this.store.select(fromAuth.selectLoginFormPending);
    this.error$ = this.store.select(fromAuth.selectLoginFormError);
  }

  onSubmit(dto: LoginUserDto) {
    this.store.dispatch(AuthActions.login({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.loginPageUnload());
  }
}
