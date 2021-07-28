import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <app-auth-page-layout>
      <app-login-section></app-login-section>
    </app-auth-page-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {}
