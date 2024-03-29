import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostResolver } from '@pique/frontend/posts';

import { PostPageComponent } from './post-page.component';

const routes: Routes = [
  { path: '', component: PostPageComponent, resolve: { post: PostResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
