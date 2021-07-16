import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Post, Profile } from '../../../shared/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;

  @Output() liked = new EventEmitter<Post>();
  @Output() unliked = new EventEmitter<Post>();

  @Output() followed = new EventEmitter<Profile>();
  @Output() unfollowed = new EventEmitter<Profile>();
}
