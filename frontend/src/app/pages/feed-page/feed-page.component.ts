import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-feed-page',
  template: ` <app-feed></app-feed> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPageComponent {}
