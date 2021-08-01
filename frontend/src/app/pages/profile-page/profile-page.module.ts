import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthModule } from '@pique/frontend/auth';
import { PostsModule } from '@pique/frontend/posts';
import { ProfilesModule } from '@pique/frontend/profiles';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, ProfilePageRoutingModule, ProfilesModule, PostsModule, AuthModule],
})
export class ProfilePageModule {}
