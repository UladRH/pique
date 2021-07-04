import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/containers/login-page.component';
import { RegisterPageComponent } from './auth/containers/register-page.component';
import { NoAuthGuard } from './auth/no-auth.guard';
import { ProfilePageComponent } from './profile/containers/profile-page.component';
import { ProfileResolver } from './profile/profile.resolver';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterPageComponent, canActivate: [NoAuthGuard] },
  { path: '', canActivate: [AuthGuard] },
  { path: ':screenName', component: ProfilePageComponent, resolve: { profileId: ProfileResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
