import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { asyncScheduler } from 'rxjs';
import { observeOn, switchMap } from 'rxjs/operators';

import * as AuthActions from './auth/state/auth.actions';

@Injectable()
export class AppEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      observeOn(asyncScheduler),
      switchMap(() => [AuthActions.init()]),
    ),
  );

  constructor(private readonly actions$: Actions) {}
}
