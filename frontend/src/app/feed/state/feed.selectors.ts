import { createFeatureSelector, createSelector } from '@ngrx/store';
import { toStaticSelector } from 'ngrx-entity-relationship';

import * as fromPost from '../../post/state/post.selectors';
import * as fromFeed from './feed.reducer';

export const selectFeedState = createFeatureSelector<fromFeed.FeedState>(fromFeed.feedFeatureKey);

export const selectFeedPostsIds = createSelector(selectFeedState, (state) => state.postsIds);

export const selectFeedPosts = toStaticSelector(fromPost.selectPosts, selectFeedPostsIds);
