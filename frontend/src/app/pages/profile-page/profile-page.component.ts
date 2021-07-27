import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../../core/interfaces';

@Component({
  selector: 'app-profile-page',
  template: `
    <ng-container *ngIf="profile$ | async as profile">
      <app-profile-section [profile]="profile"></app-profile-section>
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
