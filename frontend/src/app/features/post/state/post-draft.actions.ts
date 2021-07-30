import { createAction, props } from '@ngrx/store';

import { IError, MediaAttachmentDraft, Post } from '../../../core/interfaces';

export const uploadMedia = createAction(
  '[Post Draft] Upload media attachment',
  props<{ file: File }>(),
);
export const uploadMediaSuccess = createAction(
  '[Media API] Upload media attachment success',
  props<{ mediaAttachment: MediaAttachmentDraft }>(),
);
export const uploadMediaFailure = createAction(
  '[Media API] Upload media attachment failure',
  props<{ error: IError }>(),
);

export const removeMedia = createAction(
  '[Post Draft] Remove attachment',
  props<{ mediaAttachment: MediaAttachmentDraft }>(),
);

export const changeContent = createAction(
  '[Post Draft] Change content text',
  props<{ content: string }>(),
);

export const clear = createAction('[Post Draft] Clear');

export const publish = createAction('[Post Draft] Publish');
export const publishSuccess = createAction('[Post API] Publish Success', props<{ post: Post }>());
export const publishFailure = createAction(
  '[Post API] Publish Failure',
  props<{ error: IError }>(),
);
