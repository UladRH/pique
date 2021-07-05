import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { ProfileService } from '../profile.service';
import * as ProfileActions from './profile.actions';

@Injectable()
export class ProfileEffects {
  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.follow),
      exhaustMap(({ profile }) =>
        this.profileService.follow(profile.id).pipe(
          map((profile) => ProfileActions.followSuccess({ profile })),
          catchError((error) => of(ProfileActions.followFailure({ profile, error }))),
        ),
      ),
    ),
  );

  unfollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.unfollow),
      exhaustMap(({ profile }) =>
        this.profileService.unfollow(profile.id).pipe(
          map((profile) => ProfileActions.unfollowSuccess({ profile })),
          catchError((error) => of(ProfileActions.unfollowFailure({ profile, error }))),
        ),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly profileService: ProfileService,
  ) {}
}
