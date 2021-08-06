import { Component, OnDestroy } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectError, selectPending } from '@pique/frontend/shared/utils';
import { AuthApiActions, AuthFormsActions } from '@pique/frontend/auth/actions';
import { IError, RegisterUserDto } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-register-section',
  template: `
    <app-register-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [error]="error$ | async"
    ></app-register-form>
  `,
})
export class RegisterSectionComponent implements OnDestroy {
  pending$: Observable<boolean>;
  error$: Observable<IError | null>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.pending$ = this.actions$.pipe(
      selectPending(
        [AuthFormsActions.register],
        [AuthApiActions.registerFailure, AuthApiActions.registerSuccess],
      ),
    );

    this.error$ = this.actions$.pipe(selectError(AuthApiActions.registerFailure));
  }

  onSubmit(dto: RegisterUserDto) {
    this.store.dispatch(AuthFormsActions.register({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthFormsActions.registerPageUnload());
  }
}
