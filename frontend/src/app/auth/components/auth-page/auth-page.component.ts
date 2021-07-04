import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageComponent {}
