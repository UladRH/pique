import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { ImagePickerStore } from './image-picker.store';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ImagePickerComponent },
    ImagePickerStore,
  ],
})
export class ImagePickerComponent implements ControlValueAccessor {
  constructor(private readonly componentStore: ImagePickerStore) {}

  image$ = this.componentStore.image$;

  onFileChange($event) {
    this.componentStore.onFileChange($event);
  }

  onRemove($event) {
    this.componentStore.removeImage();
  }

  writeValue(value: string) {
    this.componentStore.setInitial(value);
  }

  registerOnChange(onChange: any) {
    this.componentStore.image$.subscribe(onChange);
  }

  registerOnTouched(onTouched: any) {}
}
