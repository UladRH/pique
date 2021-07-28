import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <app-settings></app-settings> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
