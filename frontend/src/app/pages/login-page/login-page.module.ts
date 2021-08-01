import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '@pique/frontend/shared/components';
import { AuthFormsModule } from '@pique/frontend/auth-forms';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, LoginPageRoutingModule, AuthFormsModule, AuthPageLayoutModule],
})
export class LoginPageModule {}
