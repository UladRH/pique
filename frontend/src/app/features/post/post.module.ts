import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostComponent } from './components/post/post.component';
import { PostLikeButtonComponent } from './containers/post-like-button.component';
import { PostEffects } from './state/post.effects';
import * as fromPost from './state/post.reducer';

@NgModule({
  declarations: [PostComponent, PostListComponent, PostListItemComponent, PostLikeButtonComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
    AuthModule,
    ProfileModule,
  ],
  exports: [PostComponent, PostListComponent],
})
export class PostModule {}
