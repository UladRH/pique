import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { NoAuthGuard } from './auth/no-auth.guard';
import { RegisterComponent } from './auth/register/register.component';
import { ProfilePageComponent } from './profile/containers/profile-page.component';
import { ProfileResolver } from './profile/profile.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [NoAuthGuard] },
  {
    path: ':screenName',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
    resolve: { profileId: ProfileResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
