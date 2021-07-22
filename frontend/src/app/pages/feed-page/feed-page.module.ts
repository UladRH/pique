import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FeedModule } from '../../features/feed/feed.module';
import { FeedPageRoutingModule } from './feed-page-routing.module';
import { FeedPageComponent } from './feed-page.component';

@NgModule({
  declarations: [FeedPageComponent],
  imports: [CommonModule, FeedPageRoutingModule, FeedModule],
})
export class FeedPageModule {}
