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
      [profile]="$profile | async"
      (followed)="follow($event)"
      (unfollowed)="unfollow($event)"
    ></app-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  $profile: Observable<Profile>;

  constructor(private readonly store: Store, private readonly route: ActivatedRoute) {
    this.$profile = this.route.data.pipe(
      mergeMap(({ profileId }) => this.store.select(fromProfile.getProfileById(profileId))),
    );
  }

  follow(profile: Profile) {
    this.store.dispatch(ProfileActions.follow({ profile }));
  }

  unfollow(profile: Profile) {
    this.store.dispatch(ProfileActions.unfollow({ profile }));
  }
}
