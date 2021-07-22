import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Profile } from '../../core/interfaces';
import * as ProfileActions from '../../features/profile/state/profile.actions';
import * as fromProfile from '../../features/profile/state/profile.selectors';

@Component({
  selector: 'app-profile-page',
  template: `
    <ng-container *ngIf="profile$ | async as profile">
      <app-profile
        [profile]="profile"
        [isOwnProfile]="!!(isOwnProfile$ | async)"
        (followed)="follow($event)"
        (unfollowed)="unfollow($event)"
      ></app-profile>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profile$: Observable<Profile | null>;
  isOwnProfile$: Observable<boolean>;

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {
    const profileId$ = this.route.data.pipe(map((data) => data.profileId));

    this.profile$ = profileId$.pipe(
      map((profileId) => fromProfile.selectProfileById(profileId)),
      switchMap((value) => this.store.select(value)),
    );

    this.isOwnProfile$ = profileId$.pipe(
      map((profileId) => fromProfile.selectIsOwnProfile(profileId)),
      switchMap((value) => this.store.select(value)),
    );
  }

  follow(profile: Profile) {
    this.store.dispatch(ProfileActions.follow({ profile }));
  }

  unfollow(profile: Profile) {
    this.store.dispatch(ProfileActions.unfollow({ profile }));
  }
}
