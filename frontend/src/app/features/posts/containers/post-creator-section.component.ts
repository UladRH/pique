import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MediaAttachmentDraft } from '../../../core/interfaces';
import { PostDraftActions } from '../actions';
import * as fromPost from '../reducers';

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
    this.content$ = this.store.select(fromPost.selectDraftContent);
    this.mediaAttachments$ = this.store.select(fromPost.selectDraftMediaAttachments);
  }

  uploadMedia(file: File) {
    this.store.dispatch(PostDraftActions.uploadMediaAttachment({ file }));
  }

  removeMedia(mediaAttachment: MediaAttachmentDraft) {
    this.store.dispatch(PostDraftActions.removeMediaAttachment({ mediaAttachment }));
  }

  contentChanged(content: string) {
    this.store.dispatch(PostDraftActions.changeContent({ content }));
  }

  clear() {
    this.store.dispatch(PostDraftActions.clear());
  }

  publish() {
    this.store.dispatch(PostDraftActions.publish());
  }
}
