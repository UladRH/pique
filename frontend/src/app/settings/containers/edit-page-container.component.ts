import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { ProfileUpdateDto } from '../../shared/interfaces';
import * as ProfileActions from '../../profile/state/profile.actions';
import * as fromProfile from '../../profile/state/profile.selectors';

@Component({
  selector: 'app-edit-profile-container',
  template: `
    <app-edit-profile [profile]="profile | async" (submitted)="onSubmit($event)"></app-edit-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileContainerComponent {
  profile = this.store.select(fromProfile.selectLoggedInProfile);

  constructor(private readonly store: Store) {}

  onSubmit(dto: ProfileUpdateDto) {
    this.store.dispatch(ProfileActions.updateProfileDetails({ dto }));
  }
}
