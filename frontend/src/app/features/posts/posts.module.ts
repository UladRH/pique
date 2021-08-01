import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AuthModule } from '@pique/frontend/auth';
import {
  PostCreatorComponent,
  PostDetailsComponent,
  PostListComponent,
  PostListItemComponent,
} from '@pique/frontend/posts/components';
import {
  PostCreatorSectionComponent,
  PostLikeButtonComponent,
  PostSectionComponent,
  ProfilePostsSectionComponent,
} from '@pique/frontend/posts/containers';
import { PostDraftEffects, PostEffects, ProfilePostsEffects } from '@pique/frontend/posts/effects';
import * as fromPost from '@pique/frontend/posts/reducers';
import { ProfileModule } from '@pique/frontend/profiles';

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
    StoreModule.forFeature(fromPost.postsFeatureKey, fromPost.reducers),
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
export class PostsModule {}
