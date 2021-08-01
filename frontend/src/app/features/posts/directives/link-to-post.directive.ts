import { Directive, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { Post } from '@pique/frontend/core/interfaces';

@Directive({
  selector: '[appLinkToPost]',
})
export class LinkToPostDirective extends RouterLinkWithHref {
  @Input() set appLinkToPost(post: Post) {
    this.routerLink = ['/p', post.id];
  }
}
