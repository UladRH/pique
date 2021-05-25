import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LoginUserDto, RegisterUserDto } from '../../shared/interfaces';
import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';
import { authQuery } from './auth.selectors';

@Injectable()
export class AuthFacade {
  authState$ = this.store.select(authQuery.getAuthState);
  isLoggedIn$ = this.store.select(authQuery.getLoggedIn);
  user$ = this.store.select(authQuery.getUser);
  isSubmitting$ = this.store.select(authQuery.getIsSubmitting);
  error$ = this.store.select(authQuery.getError);

  constructor(private store: Store<AuthState>) {}

  getCurrentUser(): void {
    this.store.dispatch(AuthActions.getUser());
  }

  register(dto: RegisterUserDto): void {
    this.store.dispatch(AuthActions.register({ dto }));
  }

  login(dto: LoginUserDto): void {
    this.store.dispatch(AuthActions.login({ dto }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
