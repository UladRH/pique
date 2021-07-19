import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Profile } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() profile!: Profile;
  @Input() isOwnProfile: boolean = false;

  @Output() followed = new EventEmitter<Profile>();
  @Output() unfollowed = new EventEmitter<Profile>();

  get headerImage() {
    return this.profile.headerUri ? `url("${this.profile.headerUri}")` : null;
  }

  get avatarImage() {
    return this.profile.avatarUri ? `url("${this.profile.avatarUri}")` : null;
  }
}
