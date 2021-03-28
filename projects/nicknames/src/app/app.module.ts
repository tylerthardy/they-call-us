import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MyNamesComponent } from './my-names/my-names.component';
import { ProfileComponent } from './profile/profile.component';
import { DateFilterComponent } from 'lib';
import { DateFilterModule } from 'projects/lib/src/public-api';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyNamesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    DateFilterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
