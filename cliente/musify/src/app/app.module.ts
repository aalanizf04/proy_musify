import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {UserEditComponent} from './components/user-edit.components';
import {routing, appRoutingProviders} from './app.routing';
import {ArtistListComponent} from './components/artist-list.component';
import {CanActivateViaAuthGuard} from './services/guard.services';

@NgModule({
  declarations: [
    AppComponent,
    UserEditComponent,
    ArtistListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [appRoutingProviders, CanActivateViaAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
