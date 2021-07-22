import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundPageRoutingModule } from './not-found-page-routing.module';
import { NotFoundPageComponent } from './not-found-page.component';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [CommonModule, NotFoundPageRoutingModule],
})
export class NotFoundPageModule {}
