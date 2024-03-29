import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../../core/interfaces';

@Component({
  template: `
    <ng-container *ngIf="profile$ | async as profile">
      <app-profile-section [profile]="profile"></app-profile-section>

      <app-post-creator-section *appIfOwnProfile="profile"></app-post-creator-section>

      <app-profile-posts-section [profile]="profile"></app-profile-posts-section>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent {
  profile$: Observable<Profile>;

  constructor(private readonly route: ActivatedRoute) {
    this.profile$ = this.route.data.pipe(map((data) => data.profile));
  }
}
