import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '../../shared/auth-page-layout/auth-page-layout.module';
import { AuthModule } from '../../core/auth/auth.module';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageRoutingModule, AuthModule, AuthPageLayoutModule],
})
export class LoginPageModule {}
