import { createAction, props } from '@ngrx/store';

import { MediaAttachmentDraft } from '@pique/frontend/core/interfaces';

export const uploadMediaAttachment = createAction(
  '[Post Draft] Upload Media Attachment',
  props<{ file: File }>(),
);

export const removeMediaAttachment = createAction(
  '[Post Draft] Remove Media Attachment',
  props<{ mediaAttachment: MediaAttachmentDraft }>(),
);

export const changeContent = createAction(
  '[Post Draft] Change Content',
  props<{ content: string }>(),
);

export const clear = createAction('[Post Draft] Clear');

export const publish = createAction('[Post Draft] Publish');
