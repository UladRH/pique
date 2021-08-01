import { Component, Input } from '@angular/core';

import { Post } from '@pique/frontend/core/interfaces';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
})
export class PostListItemComponent {
  @Input() post!: Post;
}
