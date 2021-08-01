import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '@pique/frontend/auth/services';
import {
  AuthActions,
  AuthApiActions,
  AuthFormsActions,
  AuthGuardsActions,
} from '@pique/frontend/auth/actions';

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
          map((user) => AuthApiActions.getUserSuccess({ user })),
          catchError((error) => of(AuthApiActions.getUserFailure({ error }))),
        ),
      ),
    ),
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthFormsActions.login),
      exhaustMap(({ dto }) =>
        this.authService.login(dto).pipe(
          map((user) => AuthApiActions.loginSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginFailure({ error }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthFormsActions.register),
      exhaustMap(({ dto }) =>
        this.authService.register(dto).pipe(
          map((user) => AuthApiActions.registerSuccess({ user })),
          catchError((error) => of(AuthApiActions.registerFailure({ error }))),
        ),
      ),
    ),
  );

  authRequired$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthGuardsActions.authRedirect, AuthGuardsActions.authRequired),
        tap(() => {
          this.router.navigateByUrl('/login');
        }),
      ),
    { dispatch: false },
  );

  loggedInRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthGuardsActions.loggedInRedirect,
          AuthApiActions.loginSuccess,
          AuthApiActions.registerSuccess,
        ),
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
