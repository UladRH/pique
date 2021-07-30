import { createReducer, on } from '@ngrx/store';

import { MediaAttachmentDraft } from '../../../core/interfaces';
import * as PostDraftActions from './post-draft.actions';

export const postDraftFeatureKey = 'postDraft';

export interface PostDraftState {
  mediaAttachments: MediaAttachmentDraft[];
  content: string;
}

export const initialState: PostDraftState = {
  mediaAttachments: [],
  content: '',
};

export const reducer = createReducer(
  initialState,

  on(PostDraftActions.uploadMediaSuccess, (state, { mediaAttachment }) => ({
    ...state,
    mediaAttachments: [...state.mediaAttachments, mediaAttachment],
  })),

  on(PostDraftActions.removeMedia, (state, { mediaAttachment }) => ({
    ...state,
    mediaAttachments: state.mediaAttachments.filter(({ id }) => id !== mediaAttachment.id),
  })),

  on(PostDraftActions.changeContent, (state, { content }) => ({
    ...state,
    content,
  })),

  on(PostDraftActions.clear, PostDraftActions.publishSuccess, () => ({
    ...initialState,
  })),
);
