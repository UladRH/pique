import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '../../shared/components/auth-page-layout/auth-page-layout.module';
import { AuthFormsModule } from '../../features/auth-forms/auth-forms.module';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageRoutingModule, AuthFormsModule, AuthPageLayoutModule],
})
export class LoginPageModule {}
