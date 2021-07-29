import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostLikeButtonComponent } from './containers/post-like-button.component';
import { PostSectionComponent } from './containers/post-section.component';
import { ProfilePostsSectionComponent } from './containers/profile-posts-section.component';
import { PostEffects } from './state/post.effects';
import * as fromPost from './state/post.reducer';
import { ProfilePostsEffects } from './state/profile-posts.effects';
import * as fromProfilePosts from './state/profile-posts.reducer';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostListComponent,
    PostListItemComponent,
    PostLikeButtonComponent,
    PostSectionComponent,
    ProfilePostsSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    StoreModule.forFeature(fromProfilePosts.profilePostsFeatureKey, fromProfilePosts.reducer),
    EffectsModule.forFeature([PostEffects, ProfilePostsEffects]),
    AuthModule,
    ProfileModule,
    InfiniteScrollModule,
  ],
  exports: [
    PostDetailsComponent,
    PostListComponent,
    PostSectionComponent,
    ProfilePostsSectionComponent,
  ],
})
export class PostModule {}
