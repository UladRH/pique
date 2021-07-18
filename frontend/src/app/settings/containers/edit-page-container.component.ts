import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Profile, ProfileEditFormDto } from '../../shared/interfaces';
import * as ProfileActions from '../../profile/state/profile.actions';
import * as fromProfile from '../../profile/state/profile.selectors';

@Component({
  selector: 'app-edit-profile-container',
  template: `
    <app-edit-profile
      *ngIf="profile$ | async as profile"
      [profile]="profile"
      [pending]="!!(pending$ | async)"
      (submitted)="onSubmit($event)"
    ></app-edit-profile>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileContainerComponent {
  profile$: Observable<Profile>;
  pending$: Observable<boolean>;

  constructor(private readonly store: Store, private readonly actions$: Actions) {
    this.profile$ = this.store.select(fromProfile.selectLoggedInProfile) as Observable<Profile>;

    this.pending$ = this.actions$.pipe(
      ofType(ProfileActions.update, ProfileActions.updateSuccess, ProfileActions.updateFailure),
      map((action) => {
        return action.type == ProfileActions.update.type;
      }),
    );
  }

  onSubmit(form: ProfileEditFormDto) {
    this.profile$.pipe(take(1)).subscribe((profile) => {
      const { avatarUri, headerUri, ...details } = form;

      let dto: ProfileEditFormDto = { ...details };

      if (avatarUri !== profile.avatarUri) {
        dto.avatarUri = avatarUri;
      }

      if (headerUri !== profile.headerUri) {
        dto.headerUri = headerUri;
      }

      this.store.dispatch(ProfileActions.update({ dto }));
    });
  }
}
