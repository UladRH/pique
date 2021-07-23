import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
  declarations: [PostListComponent, PostListItemComponent],
  imports: [CommonModule, RouterModule, AuthModule],
  exports: [PostListComponent],
})
export class PostListModule {}
