import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: `
    <app-post-creator-section></app-post-creator-section>
    <app-feed></app-feed>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedPageComponent {}
