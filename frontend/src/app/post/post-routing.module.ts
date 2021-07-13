import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostPageComponent } from './containers/post-page.component';
import { PostResolver } from './post.resolver';

const routes: Routes = [
  { path: ':id', component: PostPageComponent, resolve: { post: PostResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
