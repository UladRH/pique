import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Profile } from '../../shared/interfaces';
import * as fromProfile from '../state/profile.selectors';

@Component({
  selector: 'app-profile-page',
  template: ` <app-profile [profile]="$profile | async"></app-profile> `,
})
export class ProfilePageComponent {
  $profile: Observable<Profile>;

  constructor(private readonly route: ActivatedRoute, private readonly store: Store) {
    this.$profile = this.route.data.pipe(
      mergeMap(({ profileId }) => this.store.select(fromProfile.getProfileById(profileId))),
    );
  }

  ngOnInit(): void {}
}
