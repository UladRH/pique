import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { Profile } from '../../../core/interfaces';
import * as ProfileActions from '../state/profile.actions';

@Component({
  selector: 'app-profile-follow-button',
  template: `
    <ng-container *ngIf="profile">
      <ng-container *appIfOwnProfile="profile; else button"></ng-container>

      <ng-template #button>
        <button
          (appClickLoggedIn)="toggleFollowing()"
          class="btn w-100"
          [class.btn-outline-primary]="profile.followed"
          [class.btn-primary]="!profile.followed"
        >
          {{ profile.followed ? 'Unfollow' : 'Follow' }}
        </button>
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFollowButtonComponent {
  @Input() profile: Profile | null = null;

  constructor(private readonly store: Store) {}

  toggleFollowing() {
    const profile = this.profile;

    if (profile) {
      if (profile.followed) {
        this.store.dispatch(ProfileActions.unfollow({ profile }));
      } else {
        this.store.dispatch(ProfileActions.follow({ profile }));
      }
    }
  }
}
