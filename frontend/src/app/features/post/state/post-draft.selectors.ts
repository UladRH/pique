import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostCreateDto } from '../../../core/interfaces';
import * as fromPostDraft from './post-draft.reducer';

export const selectPostDraftState = createFeatureSelector<fromPostDraft.PostDraftState>(
  fromPostDraft.postDraftFeatureKey,
);

export const selectPostDraft = createSelector(
  selectPostDraftState,
  (state): PostCreateDto => ({
    content: state.content,
    mediaAttachmentsIds: state.mediaAttachments.map(({ id }) => id),
  }),
);

export const selectMediaAttachments = createSelector(
  selectPostDraftState,
  (state) => state.mediaAttachments,
);

export const selectContent = createSelector(selectPostDraftState, (state) => state.content);
