import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  template: ` <app-settings></app-settings> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
