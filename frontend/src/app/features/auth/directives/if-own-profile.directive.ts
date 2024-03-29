import { NgIf, NgIfContext } from '@angular/common';
import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Profile } from '@pique/frontend/core/interfaces';
import * as fromProfiles from '@pique/frontend/profiles/reducers';

@Directive({
  selector: '[appIfOwnProfile]',
})
export class IfOwnProfileDirective<T = unknown> extends NgIf implements OnDestroy {
  private subscription = new Subscription();

  constructor(
    private readonly store: Store,
    viewContainerRef: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext<T>>,
  ) {
    super(viewContainerRef, templateRef);
  }

  @Input()
  set appIfOwnProfile(profile: Profile) {
    this.subscription.unsubscribe();

    this.subscription = this.store
      .select(fromProfiles.selectIsOwnProfile(profile.id))
      .subscribe((value) => {
        this.ngIf = value;
      });
  }

  @Input()
  set appIfOwnProfileThen(templateRef: TemplateRef<NgIfContext<T>> | null) {
    this.ngIfThen = templateRef;
  }

  @Input()
  set appIfOwnProfileElse(templateRef: TemplateRef<NgIfContext<T>> | null) {
    this.ngIfElse = templateRef;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
