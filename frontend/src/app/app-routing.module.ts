import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';

import { AuthGuard, NoAuthGuard } from '@pique/frontend/auth/guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/feed-page/feed-page.module').then((m) => m.FeedPageModule),
  },
  {
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
    loadChildren: () =>
      import('./pages/profile-page/profile-page.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'p/:id',
    loadChildren: () => import('./pages/post-page/post-page.module').then((m) => m.PostPageModule),
  },
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    canActivate: [NoAuthGuard],
    loadChildren: () =>
      import('./pages/register-page/register-page.module').then((m) => m.RegisterPageModule),
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/settings-page/settings-page.module').then((m) => m.SettingsPageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./pages/not-found-page/not-found-page.module').then((m) => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
