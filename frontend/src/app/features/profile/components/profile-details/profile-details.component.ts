import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Profile } from '../../../../core/interfaces';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileDetailsComponent {
  @Input() profile: Profile | null = null;
  @Input() isOwnProfile: boolean | null = false;

  @Output() followed = new EventEmitter<Profile>();
  @Output() unfollowed = new EventEmitter<Profile>();

  get headerImage() {
    return this.profile?.headerUri ? `url("${this.profile.headerUri}")` : null;
  }

  get avatarImage() {
    return this.profile?.avatarUri ? `url("${this.profile.avatarUri}")` : null;
  }
}
