import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '../../shared/auth-page-layout/auth-page-layout.module';
import { AuthModule } from '../../core/auth/auth.module';
import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, RegisterPageRoutingModule, AuthModule, AuthPageLayoutModule],
})
export class RegisterPageModule {}
