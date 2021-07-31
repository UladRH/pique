import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

import * as fromPost from '../../post/reducers';
import * as fromFeed from './feed.reducer';

export const selectFeedState = createFeatureSelector<fromFeed.FeedState>(fromFeed.feedFeatureKey);

export const selectFeedPostsIds = createSelector(selectFeedState, (state) => state.postsIds);

export const selectFeedPosts = toStaticSelector(fromPost.selectPosts, selectFeedPostsIds);

export const selectPagination = createSelector(selectFeedState, (state) => state);
