import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '../../shared/components/auth-page-layout/auth-page-layout.module';
import { AuthFormsModule } from '../../features/auth-forms/auth-forms.module';
import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, RegisterPageRoutingModule, AuthFormsModule, AuthPageLayoutModule],
})
export class RegisterPageModule {}
