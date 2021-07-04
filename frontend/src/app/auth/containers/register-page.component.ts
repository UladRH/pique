import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { RegisterUserDto } from '../../shared/interfaces';
import * as AuthActions from '../state/auth.actions';
import * as fromAuth from '../state/auth.selectors';

@Component({
  selector: 'app-register-page',
  template: `
    <app-auth-page>
      <app-register-form
        (submitted)="onSubmit($event)"
        [pending]="pending$ | async"
        [error]="error$ | async"
      >
      </app-register-form>
    </app-auth-page>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnDestroy {
  pending$ = this.store.select(fromAuth.selectRegisterFormPending);
  error$ = this.store.select(fromAuth.selectRegisterFormError);

  constructor(private readonly store: Store) {}

  onSubmit(dto: RegisterUserDto) {
    this.store.dispatch(AuthActions.register({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.registerPageUnload());
  }
}
