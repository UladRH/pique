import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getUser),
      switchMap((item) =>
        this.authService.getCurrentUser().pipe(
          map((response) => AuthActions.getUserSuccess({ user: response })),
          catchError((error) => of(AuthActions.getUserFail({ error }))),
        ),
      ),
    ),
  );

  loginRequired$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRequired),
        exhaustMap((action) =>
          tap(() => {
            this.router.navigateByUrl('/login');
          }),
        ),
      ),
    { dispatch: false },
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.dto).pipe(
          map((response) => AuthActions.loginSuccess({ user: response })),
          catchError((error) => of(AuthActions.loginFail({ error }))),
        ),
      ),
    ),
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap((action) =>
        this.authService.register(action.dto).pipe(
          map((response) => AuthActions.registerSuccess({ user: response })),
          catchError((error) => of(AuthActions.registerFail({ error }))),
        ),
      ),
    ),
  );

  loginOrRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
      ),
    { dispatch: false },
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        exhaustMap(() =>
          this.authService.logout().pipe(
            tap(() => {
              this.router.navigateByUrl('/login');
            }),
          ),
        ),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}
}
