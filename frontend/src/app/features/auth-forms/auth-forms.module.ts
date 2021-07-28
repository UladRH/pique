import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthModule } from '../auth/auth.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginSectionComponent } from './containers/login-section.component';
import { RegisterSectionComponent } from './containers/register-section.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    LoginSectionComponent,
    RegisterSectionComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AuthModule],
  exports: [LoginSectionComponent, RegisterSectionComponent],
})
export class AuthFormsModule {}
