import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <app-auth-page-layout>
      <app-register-section></app-register-section>
    </app-auth-page-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {}
