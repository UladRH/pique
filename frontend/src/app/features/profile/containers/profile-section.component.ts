import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Profile } from '../../../core/interfaces';
import * as ProfileActions from '../state/profile.actions';
import * as fromProfile from '../state/profile.selectors';

@Component({
  selector: 'app-profile-section',
  template: `
    <app-profile-details
      [profile]="profile$ | async"
      [isOwnProfile]="isOwnProfile$ | async"
      (followed)="follow($event)"
      (unfollowed)="unfollow($event)"
    ></app-profile-details>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSectionComponent {
  profile$!: Observable<Profile>;
  isOwnProfile$!: Observable<boolean>;

  constructor(private readonly store: Store) {}

  @Input() set profile(profile: Profile) {
    this.profile$ = this.store.select(
      fromProfile.selectProfileById(profile.id),
    ) as Observable<Profile>;

    this.isOwnProfile$ = this.store.select(fromProfile.selectIsOwnProfile(profile.id));
  }

  follow(profile: Profile) {
    this.store.dispatch(ProfileActions.follow({ profile }));
  }

  unfollow(profile: Profile) {
    this.store.dispatch(ProfileActions.unfollow({ profile }));
  }
}