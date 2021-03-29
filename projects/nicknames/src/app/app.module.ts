import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule, ClrButtonModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MyNamesComponent } from './my-names/my-names.component';
import { ProfileComponent } from './profile/profile.component';
import { DateFilterModule } from 'lib';
import { DatagridModule } from 'projects/lib/src/public-api';
import { NewNameComponent } from './my-names/new-name/new-name.component';
import { CdsBaseButton } from '@cds/core/internal';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyNamesComponent,
    ProfileComponent,
    NewNameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgxGraphModule,
    // lib modules
    DatagridModule,
    DateFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
