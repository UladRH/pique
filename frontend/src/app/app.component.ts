import { Component, OnInit } from '@angular/core';

import { AuthFacade } from './auth/+state/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authFacade: AuthFacade) {}

  ngOnInit(): void {
    this.authFacade.getCurrentUser();
  }
}
