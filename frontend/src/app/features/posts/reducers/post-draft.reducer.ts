import { createReducer, on } from '@ngrx/store';

import { MediaAttachmentDraft } from '../../../core/interfaces';
import { MediaAttachmentsApiActions, PostsApiActions } from '../actions';
import * as PostDraftActions from '../actions/post-draft.actions';

export const postDraftFeatureKey = 'draft';

export interface State {
  mediaAttachments: MediaAttachmentDraft[];
  content: string;
}

export const initialState: State = {
  mediaAttachments: [],
  content: '',
};

export const reducer = createReducer(
  initialState,

  on(MediaAttachmentsApiActions.uploadSuccess, (state, { mediaAttachment }) => ({
    ...state,
    mediaAttachments: [...state.mediaAttachments, mediaAttachment],
  })),

  on(PostDraftActions.removeMediaAttachment, (state, { mediaAttachment }) => ({
    ...state,
    mediaAttachments: state.mediaAttachments.filter(({ id }) => id !== mediaAttachment.id),
  })),

  on(PostDraftActions.changeContent, (state, { content }) => ({
    ...state,
    content,
  })),

  on(PostDraftActions.clear, PostsApiActions.publishSuccess, () => ({
    ...initialState,
  })),
);
