import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: ` <app-feed></app-feed> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPageComponent {}
