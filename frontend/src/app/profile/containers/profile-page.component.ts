import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Profile } from '../../shared/interfaces';
import * as ProfileActions from '../state/profile.actions';
import * as fromProfile from '../state/profile.selectors';

@Component({
  selector: 'app-profile-page',
  template: `
    <app-profile
      *ngIf="$profile | async as profile"
      [profile]="profile"
      [isOwnProfile]="!!($isOwnProfile | async)"
      (followed)="follow($event)"
      (unfollowed)="unfollow($event)"
    ></app-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  $profile = this.route.data.pipe(
    mergeMap(
      ({ profileId }) =>
        this.store.select(fromProfile.selectProfileById(profileId)) as Observable<Profile>,
    ),
  );

  $isOwnProfile = this.route.data.pipe(
    mergeMap(
      ({ profileId }) =>
        this.store.select(fromProfile.selectIsOwnProfile(profileId)) as Observable<boolean>,
    ),
  );

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {}

  follow(profile: Profile) {
    this.store.dispatch(ProfileActions.follow({ profile }));
  }

  unfollow(profile: Profile) {
    this.store.dispatch(ProfileActions.unfollow({ profile }));
  }
}
