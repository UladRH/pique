import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '../../features/auth/auth.module';
import { PostsModule } from '../../features/posts/posts.module';
import { ProfileModule } from '../../features/profiles/profile.module';
import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ProfilePageRoutingModule, ProfileModule, PostsModule, AuthModule],
})
export class ProfilePageModule {}
