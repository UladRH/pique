import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostsModule } from '@pique/frontend/posts';

import { PostPageRoutingModule } from './post-page-routing.module';
import { PostPageComponent } from './post-page.component';

@NgModule({
  declarations: [PostPageComponent],
  imports: [CommonModule, PostPageRoutingModule, PostsModule],
})
export class PostPageModule {}
