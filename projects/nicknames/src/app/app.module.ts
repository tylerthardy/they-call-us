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
import { NameComponent } from './my-names/name/name.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { Environment } from '../environments/environment.interface';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { INamesService, namesFactory } from './my-names/names.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './dashboard/leaderboard/leaderboard.component';
import { dashboardFactory, IDashboardService } from './dashboard/dashboard.service';
import { TheyCallUsClient } from '../data-model/DataModel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MyNamesComponent,
    ProfileComponent,
    NameComponent,
    DashboardComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
      deps: [Environment, HttpClient],
    },
    {
      provide: IDashboardService,
      useFactory: dashboardFactory,
      deps: [Environment, HttpClient],
    },
    {
      provide: TheyCallUsClient,
      deps: [HttpClient]
    },
    { provide: Environment, useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
