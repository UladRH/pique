import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { MediaAttachmentDraft } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreatorComponent {
  @Input() content!: string;
  @Input() mediaAttachments!: MediaAttachmentDraft[];

  @Output() contentChanged = new EventEmitter<string>();

  @Output() uploadMedia = new EventEmitter<File>();
  @Output() removeMedia = new EventEmitter<MediaAttachmentDraft>();

  @Output() clear = new EventEmitter();
  @Output() publish = new EventEmitter();

  upload($event: Event) {
    const file = ($event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.uploadMedia.emit(file);
    }
  }

  change($event: Event) {
    this.contentChanged.emit(($event.target as HTMLTextAreaElement).value);
  }
}
