import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PostsModule } from '@pique/frontend/posts/posts.module';
import { FeedComponent } from '@pique/frontend/feed/feed.component';
import { FeedEffects } from '@pique/frontend/feed/state/feed.effects';
import * as fromFeed from '@pique/frontend/feed/state/feed.reducer';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromFeed.feedFeatureKey, fromFeed.reducer),
    EffectsModule.forFeature([FeedEffects]),
    PostsModule,
    InfiniteScrollModule,
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
