import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@angular/material';

import { D3Service } from 'd3-ng2-service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectionMapComponent } from './election-map/election-map.component';
import { ElectionInfoComponent } from './election-info/election-info.component';
import { ElectionResultsComponent } from './election-results/election-results.component';
import { StateElectionDetailComponent } from './election-results/state-election-detail.component';
import { StateElectionDetailResolverService } from './election-results/state-election-detail-resolver.service';
import { NationalElectionDetailComponent } from './election-results/national-election-detail.component';
import { StateInfoService } from './state-info.service';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ElectionMapComponent,
    ElectionInfoComponent,
    ElectionResultsComponent,
    StateElectionDetailComponent,
    NationalElectionDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    D3Service,
    StateElectionDetailResolverService,
    StateInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
