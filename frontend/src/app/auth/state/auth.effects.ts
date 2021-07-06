import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.init),
      switchMap(() => [AuthActions.getUser()]),
    ),
  );

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap(() =>
        this.authService.getLoggedInUser().pipe(
          map((data) => AuthActions.getUserSuccess(data)),
          catchError((error) => of(AuthActions.getUserFailure({ error }))),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ dto }) =>
        this.authService.login(dto).pipe(
          map((data) => AuthActions.loginSuccess(data)),
          catchError((error) => of(AuthActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(({ dto }) =>
        this.authService.register(dto).pipe(
          map((data) => AuthActions.registerSuccess(data)),
          catchError((error) => of(AuthActions.registerFailure({ error }))),
        ),
      ),
    ),
  );

  authRequired$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authRedirect, AuthActions.authRequired),
        tap(() => {
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );

  loggedInRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loggedInRedirect, AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}
}
