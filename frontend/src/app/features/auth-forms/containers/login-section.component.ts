import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthFormsActions } from '@pique/frontend/auth/actions';
import * as fromAuth from '@pique/frontend/auth/reducers';
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

  constructor(private readonly store: Store) {
    this.pending$ = this.store.select(fromAuth.selectLoginFormPending);
    this.error$ = this.store.select(fromAuth.selectLoginFormError);
  }

  onSubmit(dto: LoginUserDto) {
    this.store.dispatch(AuthFormsActions.login({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthFormsActions.loginPageUnload());
  }
}
