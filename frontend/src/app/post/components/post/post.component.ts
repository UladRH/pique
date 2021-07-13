import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Profile } from '../../../shared/interfaces';
import { Post } from '../../../shared/interfaces/post.interface';

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
