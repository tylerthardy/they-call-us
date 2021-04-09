import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MyNamesComponent } from './my-names/my-names.component';
import { ProfileComponent } from './profile/profile.component';
import { DateFilterModule, DatagridModule, ModalModule } from 'lib';
import { NewNameComponent } from './my-names/new-name/new-name.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { Environment } from '../environments/environment.interface';
import { HttpClient } from '@angular/common/http';
import { INamesService, namesFactory } from './my-names/names.service';

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
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ModalModule,
    NgxGraphModule,
    // lib modules
    DatagridModule,
    DateFilterModule
  ],
  providers: [
    {
      provide: INamesService,
      useFactory: namesFactory,
      deps: [HttpClient, Environment],
   },
    { provide: Environment, useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
