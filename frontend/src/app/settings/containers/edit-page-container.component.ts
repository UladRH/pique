import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Profile, ProfileEditFormDto } from '../../shared/interfaces';
import * as ProfileActions from '../../profile/state/profile.actions';
import * as fromProfile from '../../profile/state/profile.selectors';

@Component({
  selector: 'app-edit-profile-container',
  template: `
    <app-edit-profile
      [profile]="profile$ | async"
      (submitChanged)="onSubmit($event)"
    ></app-edit-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileContainerComponent implements OnInit {
  profile$: Observable<Profile>;

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.profile$ = this.store.select(fromProfile.selectLoggedInProfile);
  }

  onSubmit(dto: ProfileEditFormDto) {
    this.store.dispatch(ProfileActions.update({ dto }));
  }
}
