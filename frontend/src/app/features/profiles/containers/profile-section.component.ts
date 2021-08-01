import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Profile } from '@pique/frontend/core/interfaces';
import * as fromProfile from '@pique/frontend/profiles/reducers';

@Component({
  selector: 'app-profile-section',
  template: ` <app-profile-details [profile]="profile$ | async"></app-profile-details> `,
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
}
