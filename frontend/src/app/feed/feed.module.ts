import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PostModule } from '../post/post.module';
import * as fromFeed from '../feed/state/feed.reducer';
import { FeedComponent } from './feed.component';
import { FeedEffects } from './state/feed.effects';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromFeed.feedFeatureKey, fromFeed.reducer),
    EffectsModule.forFeature([FeedEffects]),
    PostModule,
  ],
})
export class FeedModule {}
