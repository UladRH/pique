import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../core/auth/state/auth.actions';
import * as fromAuth from '../../core/auth/state/auth.selectors';
import { IError, RegisterUserDto } from '../../core/interfaces';

@Component({
  selector: 'app-register-page',
  template: `
    <app-auth-page-layout>
      <app-register-form
        (submitted)="onSubmit($event)"
        [pending]="!!(pending$ | async)"
        [error]="error$ | async"
      >
      </app-register-form>
    </app-auth-page-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent implements OnDestroy {
  pending$: Observable<boolean>;
  error$: Observable<IError | null>;

  constructor(private readonly store: Store) {
    this.pending$ = this.store.select(fromAuth.selectRegisterFormPending);
    this.error$ = this.store.select(fromAuth.selectRegisterFormError);
  }

  onSubmit(dto: RegisterUserDto) {
    this.store.dispatch(AuthActions.register({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.registerPageUnload());
  }
}
