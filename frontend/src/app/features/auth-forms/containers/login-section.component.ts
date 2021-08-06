import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectError, selectPending } from '@pique/frontend/shared/utils';
import { AuthApiActions, AuthFormsActions } from '@pique/frontend/auth/actions';
import { IError, LoginUserDto } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-login-section',
  template: `
    <app-login-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [error]="error$ | async"
    ></app-login-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginSectionComponent implements OnDestroy {
  pending$: Observable<boolean>;
  error$: Observable<IError | null>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.pending$ = this.actions$.pipe(
      selectPending(
        [AuthFormsActions.login],
        [AuthApiActions.loginFailure, AuthApiActions.loginSuccess],
      ),
    );

    this.error$ = this.actions$.pipe(selectError(AuthApiActions.loginFailure));
  }

  onSubmit(dto: LoginUserDto) {
    this.store.dispatch(AuthFormsActions.login({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthFormsActions.loginPageUnload());
  }
}
