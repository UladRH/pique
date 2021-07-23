import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutComponent } from './auth-page-layout.component';

@NgModule({
  declarations: [AuthPageLayoutComponent],
  imports: [CommonModule],
  exports: [AuthPageLayoutComponent],
})
export class AuthPageLayoutModule {}
