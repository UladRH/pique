import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import {
  PostCreatorComponent,
  PostDetailsComponent,
  PostListComponent,
  PostListItemComponent,
} from './components';
import {
  PostCreatorSectionComponent,
  PostLikeButtonComponent,
  PostSectionComponent,
  ProfilePostsSectionComponent,
} from './containers';
import { PostDraftEffects, PostEffects, ProfilePostsEffects } from './effects';
import * as fromPost from './reducers';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostCreatorComponent,
    PostListComponent,
    PostListItemComponent,
    PostSectionComponent,
    PostLikeButtonComponent,
    PostCreatorSectionComponent,
    ProfilePostsSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducers),
    EffectsModule.forFeature([PostEffects, PostDraftEffects, ProfilePostsEffects]),
    AuthModule,
    ProfileModule,
    InfiniteScrollModule,
  ],
  exports: [
    PostListComponent,
    PostListItemComponent,
    PostSectionComponent,
    PostLikeButtonComponent,
    PostCreatorSectionComponent,
    ProfilePostsSectionComponent,
  ],
})
export class PostModule {}
