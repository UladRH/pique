import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedModule } from '@pique/frontend/feed';
import { PostsModule } from '@pique/frontend/posts';

import { FeedPageRoutingModule } from './feed-page-routing.module';
import { FeedPageComponent } from './feed-page.component';

@NgModule({
  declarations: [FeedPageComponent],
  imports: [CommonModule, FeedPageRoutingModule, FeedModule, PostsModule],
})
export class FeedPageModule {}
