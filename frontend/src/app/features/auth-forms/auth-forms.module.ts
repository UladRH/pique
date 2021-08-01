import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthModule } from '@pique/frontend/auth';
import { LoginFormComponent, RegisterFormComponent } from '@pique/frontend/auth-forms/components';
import {
  LoginSectionComponent,
  RegisterSectionComponent,
} from '@pique/frontend/auth-forms/containers';

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
