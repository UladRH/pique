import { createAction, props } from '@ngrx/store';

import { IError, MediaAttachmentDraft } from '../../../core/interfaces';

export const uploadSuccess = createAction(
  '[Media Attachments/API] Upload Media Attachment Success',
  props<{ mediaAttachment: MediaAttachmentDraft }>(),
);

export const uploadFailure = createAction(
  '[Media Attachments/API] Upload Media Attachment Failure',
  props<{ error: IError }>(),
);
