import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, withLatestFrom } from 'rxjs/operators';

import { ProfileService } from '../profile.service';
import * as fromProfile from '../state/profile.selectors';
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

  updateProfileDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfileDetails),
      withLatestFrom(this.store.select(fromProfile.selectLoggedInProfile)),
      exhaustMap(([{ dto }, profile]) =>
        this.profileService.updateProfile(profile.id, dto).pipe(
          map((profile) => ProfileActions.updateProfileDetailsSuccess({ profile })),
          catchError((error) => of(ProfileActions.updateProfileDetailsFailure({ error }))),
        ),
      ),
    ),
  );

  updateProfileDetailsSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateProfileDetailsSuccess),
        tap(() => this.toast.success('Profile saved.')),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly profileService: ProfileService,
    private readonly toast: ToastrService,
  ) {}
}
