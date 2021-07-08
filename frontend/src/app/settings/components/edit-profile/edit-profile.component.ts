import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Profile, ProfileUpdateDto } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  @Input()
  set profile(profile: Profile) {
    if (profile) {
      this.form.patchValue(profile);
      this.form.markAsPristine();
      this.previousScreenName = profile.screenName;
    }
  }

  @Output() submitted = new EventEmitter<ProfileUpdateDto>();

  previousScreenName: string;

  form = this.formBuilder.group({
    displayName: ['', [Validators.maxLength(40)]],
    screenName: [''],
    bio: ['', [Validators.maxLength(1000)]],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  onSubmit() {
    if (this.form.valid) {
      this.submitted.emit({
        displayName: this.displayName.value,
        bio: this.bio.value,
      });
    }
  }

  get displayName() {
    return this.form.get('displayName');
  }

  get screenName() {
    return this.form.get('screenName');
  }

  get bio() {
    return this.form.get('bio');
  }
}
