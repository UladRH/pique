import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostsModule } from '../../features/posts/posts.module';
import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostPageRoutingModule, PostsModule],
})
export class PostPageModule {}
