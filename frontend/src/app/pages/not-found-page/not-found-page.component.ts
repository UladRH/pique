import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './not-found-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  constructor() {}
}
