import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Profile } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDetailsComponent {
  @Input() profile: Profile | null = null;

  get headerImage() {
    return this.profile?.headerUri ? `url("${this.profile.headerUri}")` : null;
  }

  get avatarImage() {
    return this.profile?.avatarUri ? `url("${this.profile.avatarUri}")` : null;
  }
}
