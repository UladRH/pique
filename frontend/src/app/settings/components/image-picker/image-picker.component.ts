import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
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
export class ImagePickerComponent implements ControlValueAccessor, OnChanges {
  @Input() width: number = 500;
  @Input() height: number = 500;

  image$ = this.componentStore.image$;

  constructor(private readonly componentStore: ImagePickerStore) {}

  ngOnChanges(): void {
    this.componentStore.setCropModalOpts({
      width: this.width,
      height: this.height,
    });
  }

  onFileChange($event: Event) {
    this.componentStore.onFileChange($event as InputEvent);
  }

  onRemove(_$event: Event) {
    this.componentStore.removeImage();
  }

  writeValue(value: string | null) {
    this.componentStore.setInitialImage(value);
  }

  registerOnChange(onChange: any) {
    this.componentStore.image$.subscribe(onChange);
  }

  registerOnTouched(onTouched: any) {}
}
