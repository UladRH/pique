import { Component, Input } from '@angular/core';

import { Profile } from '../../../shared/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @Input() profile!: Profile;
}
