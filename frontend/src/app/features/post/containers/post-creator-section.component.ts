import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaAttachmentDraft } from '../../../core/interfaces';
import * as PostDraftActions from '../state/post-draft.actions';
import * as fromPostDraft from '../state/post-draft.selectors';

@Component({
  selector: 'app-post-creator-section',
  template: ` <app-post-creator
    [content]="(content$ | async) ?? ''"
    [mediaAttachments]="(mediaAttachments$ | async) ?? []"
    (uploadMedia)="uploadMedia($event)"
    (removeMedia)="removeMedia($event)"
    (contentChanged)="contentChanged($event)"
    (clear)="clear()"
    (publish)="publish()"
  ></app-post-creator>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCreatorSectionComponent {
  content$: Observable<string>;
  mediaAttachments$: Observable<MediaAttachmentDraft[]>;

  constructor(private readonly store: Store) {
    this.content$ = this.store.select(fromPostDraft.selectContent);
    this.mediaAttachments$ = this.store.select(fromPostDraft.selectMediaAttachments);
  }

  uploadMedia(file: File) {
    this.store.dispatch(PostDraftActions.uploadMedia({ file }));
  }

  removeMedia(mediaAttachment: MediaAttachmentDraft) {
    this.store.dispatch(PostDraftActions.removeMedia({ mediaAttachment }));
  }

  clear() {
    this.store.dispatch(PostDraftActions.clear());
  }

  publish() {
    this.store.dispatch(PostDraftActions.publish());
  }

  contentChanged(content: string) {
    this.store.dispatch(PostDraftActions.changeContent({ content }));
  }
}
