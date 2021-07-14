import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './auth/containers/login-page.component';
import { RegisterPageComponent } from './auth/containers/register-page.component';
import { NoAuthGuard } from './auth/no-auth.guard';
import { FeedComponent } from './feed/feed.component';
import { PostPageComponent } from './post/containers/post-page.component';
import { PostResolver } from './post/post.resolver';
import { ProfilePageComponent } from './profile/containers/profile-page.component';
import { ProfileResolver } from './profile/profile.resolver';
import { EditProfileContainerComponent } from './settings/containers/edit-page-container.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: EditProfileContainerComponent,
      },
    ],
  },
  {
    path: 'p/:id',
    component: PostPageComponent,
    resolve: { post: PostResolver },
  },
  {
    component: ProfilePageComponent,
    resolve: { profileId: ProfileResolver },
    // @screenName
    matcher: (url) => {
      if (url.length === 1 && url[0].path.startsWith('@')) {
        return {
          consumed: url,
          posParams: {
            screenName: new UrlSegment(url[0].path.substr(1), {}),
          },
        };
      }

      return null;
    },
  },
  {
    path: '',
    pathMatch: 'full',
    component: FeedComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
