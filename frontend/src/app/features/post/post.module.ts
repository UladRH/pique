import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { ProfileModule } from '../profile/profile.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostLikeButtonComponent } from './containers/post-like-button.component';
import { PostSectionComponent } from './containers/post-section.component';
import { PostEffects } from './state/post.effects';
import * as fromPost from './state/post.reducer';

@NgModule({
  declarations: [
    PostDetailsComponent,
    PostListComponent,
    PostListItemComponent,
    PostLikeButtonComponent,
    PostSectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
    AuthModule,
    ProfileModule,
  ],
  exports: [PostDetailsComponent, PostListComponent, PostSectionComponent],
})
export class PostModule {}
