import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

import * as fromFeed from '@pique/frontend/feed/state/feed.reducer';
import * as fromPost from '@pique/frontend/posts/reducers';

export const selectFeedState = createFeatureSelector<fromFeed.FeedState>(fromFeed.feedFeatureKey);

export const selectFeedPostsIds = createSelector(selectFeedState, (state) => state.postsIds);

export const selectFeedPosts = toStaticSelector(fromPost.selectPosts, selectFeedPostsIds);

export const selectPagination = createSelector(selectFeedState, (state) => state);
