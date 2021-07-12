import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile, ProfileEditFormDto } from '../../shared/interfaces';
import * as ProfileActions from '../../profile/state/profile.actions';
import * as fromProfile from '../../profile/state/profile.selectors';

@Component({
  selector: 'app-edit-profile-container',
  template: `
    <app-edit-profile
      [profile]="profile$ | async"
      [pending]="pending$ | async"
      (submitChanged)="onSubmit($event)"
    ></app-edit-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileContainerComponent implements OnInit {
  profile$: Observable<Profile>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {}

  ngOnInit() {
    this.profile$ = this.store.select(fromProfile.selectLoggedInProfile);

    this.pending$ = this.actions$.pipe(
      ofType(ProfileActions.update, ProfileActions.updateSuccess, ProfileActions.updateFailure),
      map((action) => {
        return action.type == ProfileActions.update.type;
      }),
    );
  }

  onSubmit(dto: ProfileEditFormDto) {
    this.store.dispatch(ProfileActions.update({ dto }));
  }
}
