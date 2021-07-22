import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostModule } from '../../features/post/post.module';
import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostPageRoutingModule, PostModule],
})
export class PostPageModule {}
