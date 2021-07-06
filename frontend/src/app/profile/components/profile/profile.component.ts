import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Profile } from '../../../shared/interfaces';
import { resolveMediaBgImage } from '../../../shared/resolve-image.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() profile: Profile;
  @Input() isOwnProfile: boolean;

  @Output() followed = new EventEmitter<Profile>();
  @Output() unfollowed = new EventEmitter<Profile>();

  get headerImage() {
    return resolveMediaBgImage(this.profile.headerUri);
  }

  get avatarImage() {
    return resolveMediaBgImage(this.profile.avatarUri);
  }
}
