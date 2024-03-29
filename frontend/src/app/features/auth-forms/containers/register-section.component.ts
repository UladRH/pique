import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthFormsActions } from '@pique/frontend/auth/actions';
import * as fromAuth from '@pique/frontend/auth/reducers';
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

  constructor(private readonly store: Store) {
    this.pending$ = this.store.select(fromAuth.selectRegisterFormPending);
    this.error$ = this.store.select(fromAuth.selectRegisterFormError);
  }

  onSubmit(dto: RegisterUserDto) {
    this.store.dispatch(AuthFormsActions.register({ dto }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthFormsActions.registerPageUnload());
  }
}
