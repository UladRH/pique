import { Directive, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';

import { Profile } from '@pique/frontend/core/interfaces';

@Directive({
  selector: '[appLinkToProfile]',
})
export class LinkToProfileDirective extends RouterLinkWithHref {
  @Input() set appLinkToProfile(profile: Profile) {
    this.routerLink = ['/@' + profile.screenName];
    this.state = { profileId: profile.id };
  }
}
