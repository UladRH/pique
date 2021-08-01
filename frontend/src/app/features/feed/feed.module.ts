import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PostsModule } from '../posts/posts.module';
import { FeedComponent } from './feed.component';
import { FeedEffects } from './state/feed.effects';
import * as fromFeed from './state/feed.reducer';

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
