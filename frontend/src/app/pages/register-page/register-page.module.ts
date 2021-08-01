import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AuthPageLayoutModule } from '@pique/frontend/shared/components';
import { AuthFormsModule } from '@pique/frontend/auth-forms';

import { RegisterPageRoutingModule } from './register-page-routing.module';
import { RegisterPageComponent } from './register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [CommonModule, RegisterPageRoutingModule, AuthFormsModule, AuthPageLayoutModule],
})
export class RegisterPageModule {}
