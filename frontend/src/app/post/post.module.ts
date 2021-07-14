import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../auth/auth.module';
import { PostComponent } from './components/post/post.component';
import { PostPageComponent } from './containers/post-page.component';
import { PostEffects } from './state/post.effects';
import * as fromPost from './state/post.reducer';

@NgModule({
  declarations: [PostComponent, PostPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    StoreModule.forFeature(fromPost.postFeatureKey, fromPost.reducer),
    EffectsModule.forFeature([PostEffects]),
    AuthModule,
  ],
})
export class PostModule {}
