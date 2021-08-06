import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { selectPending } from '@pique/frontend/shared/utils';
import { Profile, ProfileEditFormDto } from '@pique/frontend/core/interfaces';
import { ProfileActions, ProfilesApiActions } from '@pique/frontend/profiles/actions';
import * as fromProfile from '@pique/frontend/profiles/reducers';

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
      selectPending(
        [ProfileActions.update],
        [ProfilesApiActions.updateSuccess, ProfilesApiActions.updateFailure],
      ),
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
