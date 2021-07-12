import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile, ProfileEditFormDto } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnInit, OnChanges {
  @Input() profile: Profile;

  @Output() submitChanged = new EventEmitter<ProfileEditFormDto>();

  form: FormGroup = this.formBuilder.group({
    displayName: ['', [Validators.maxLength(40)]],
    screenName: [''],
    bio: ['', [Validators.maxLength(1000)]],
    avatarUri: [],
    headerUri: [],
  });

  isChanged$: Observable<boolean>;

  avatarPreviewBg$: Observable<string>;

  headerPreviewBg$: Observable<string>;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.isChanged$ = this.form.valueChanges.pipe(
      map((form) => {
        for (const key of Object.keys(form)) {
          if (form[key] != this.profile[key]) {
            return true;
          }
        }
        return false;
      }),
    );

    this.avatarPreviewBg$ = this.avatarUri.valueChanges.pipe(
      map((uri) => (uri ? `url("${uri}")` : null)),
    );

    this.headerPreviewBg$ = this.headerUri.valueChanges.pipe(
      map((uri) => (uri ? `url("${uri}")` : null)),
    );
  }

  ngOnChanges() {
    setTimeout(() => this.form.patchValue(this.profile));
  }

  onSubmit() {
    if (this.form.valid) {
      const changes = {};

      for (const key of Object.keys(this.form.value)) {
        if (this.form.value[key] != this.profile[key]) {
          changes[key] = this.form.value[key];
        }
      }

      this.submitChanged.emit(changes);
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

  get avatarUri() {
    return this.form.get('avatarUri');
  }

  get headerUri() {
    return this.form.get('headerUri');
  }
}
