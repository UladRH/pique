import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { ProfilesService } from '../services';
import { ProfileActions, ProfilesApiActions } from '../actions';
import * as fromProfile from '../reducers';

@Injectable()
export class ProfileEffects {
  follow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.follow),
      exhaustMap(({ profile }) =>
        this.profilesService.follow(profile.id).pipe(
          map((profile) => ProfilesApiActions.followSuccess({ profile })),
          catchError((error) => of(ProfilesApiActions.followFailure({ profile, error }))),
        ),
      ),
    ),
  );

  unfollow$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.unfollow),
      exhaustMap(({ profile }) =>
        this.profilesService.unfollow(profile.id).pipe(
          map((profile) => ProfilesApiActions.unfollowSuccess({ profile })),
          catchError((error) => of(ProfilesApiActions.unfollowFailure({ profile, error }))),
        ),
      ),
    ),
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.update),
      withLatestFrom(this.store.select(fromProfile.selectLoggedInProfile)),
      exhaustMap(([{ dto }, profile]) =>
        this.profilesService.update(profile!.id, dto).pipe(
          map((profile) => ProfilesApiActions.updateSuccess({ profile })),
          catchError((error) => of(ProfilesApiActions.updateFailure({ error }))),
        ),
      ),
    ),
  );

  updateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesApiActions.updateSuccess),
        tap(() => this.toast.success('Profile saved.')),
      ),
    { dispatch: false },
  );

  updateFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfilesApiActions.updateFailure),
        tap(() => this.toast.error('An error occurred while saving profile changes.')),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly profilesService: ProfilesService,
    private readonly toast: ToastrService,
  ) {}
}
