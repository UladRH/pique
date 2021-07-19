import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Profile, ProfileEditFormDto } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {
  @Output() submitted = new EventEmitter<ProfileEditFormDto>();

  form: FormGroup = this.formBuilder.group({
    displayName: ['', [Validators.maxLength(40)]],
    screenName: [],
    bio: ['', [Validators.maxLength(1000)]],
    avatarUri: [],
    headerUri: [],
  });

  constructor(private readonly formBuilder: FormBuilder) {}

  @Input() set profile(profile: Profile) {
    this.form.patchValue(profile);
    this.form.markAsPristine();
  }

  @Input() set pending(pending: boolean) {
    if (pending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  get displayName() {
    return this.form.get('displayName') as AbstractControl;
  }

  get screenName() {
    return this.form.get('screenName') as AbstractControl;
  }

  get bio() {
    return this.form.get('bio') as AbstractControl;
  }

  get avatarUri() {
    return this.form.get('avatarUri') as AbstractControl;
  }

  get headerUri() {
    return this.form.get('headerUri') as AbstractControl;
  }

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
