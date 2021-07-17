import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile, ProfileEditFormDto } from '../../../shared/interfaces';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent implements OnChanges {
  @Input() profile!: Profile;
  @Input() pending: boolean = false;

  @Output() submitChanged = new EventEmitter<ProfileEditFormDto>();

  form: FormGroup = this.formBuilder.group({
    displayName: ['', [Validators.maxLength(40)]],
    screenName: [''],
    bio: ['', [Validators.maxLength(1000)]],
    avatarUri: [],
    headerUri: [],
  });

  isChanged$: Observable<boolean>;

  avatarPreviewBg$: Observable<string | null>;

  headerPreviewBg$: Observable<string | null>;

  constructor(private readonly formBuilder: FormBuilder) {
    this.isChanged$ = this.form.valueChanges.pipe(
      map((form) => {
        for (const key of Object.keys(form)) {
          // @ts-ignore
          if (form[key] != this.profile[key]) {
            return true;
          }
        }
        return false;
      }),
    );

    this.avatarPreviewBg$ = this.avatarUri!.valueChanges.pipe(
      map((uri) => (uri ? `url("${uri}")` : null)),
    );

    this.headerPreviewBg$ = this.headerUri!.valueChanges.pipe(
      map((uri) => (uri ? `url("${uri}")` : null)),
    );
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['profile']) {
      setTimeout(() => this.form.patchValue(this.profile));
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const changes = {};

      for (const key of Object.keys(this.form.value)) {
        // @ts-ignore
        if (this.form.value[key] != this.profile[key]) {
          // @ts-ignore
          changes[key] = this.form.value[key];
        }
      }

      this.submitChanged.emit(changes);
    }
  }
}
