import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ngrxEntityRelationshipReducer } from 'ngrx-entity-relationship';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from '@pique/frontend/app-routing.module';
import { AppComponent } from '@pique/frontend/app.component';
import { AppEffects } from '@pique/frontend/app.effects';
import { AuthModule } from '@pique/frontend/auth';
import { CoreModule } from '@pique/frontend/core';
import { environment } from '@pique/frontend/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HammerModule,
    StoreModule.forRoot({}, { metaReducers: [ngrxEntityRelationshipReducer] }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-center' }),
    SimpleModalModule,
    CoreModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
