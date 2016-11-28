import { Route, Router } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ElectionInfoComponent } from './election-info/election-info.component';
import { ElectionResultsComponent } from './election-results/election-results.component';
import { StateElectionDetailComponent } from './election-results/state-election-detail.component';
import { StateElectionDetailResolverService } from './election-results/state-election-detail-resolver.service';
import { NationalElectionDetailComponent } from './election-results/national-election-detail.component';

export const routes = <Array<Route>>[
    { path: 'dashboard', component: DashboardComponent },
    { path: 'about', component: ElectionInfoComponent },
    { path: 'results', component: ElectionResultsComponent,
      children: [
          { path: 'national', component: NationalElectionDetailComponent },
          { path: ':stateAbbrev', component: StateElectionDetailComponent,
            resolve: [StateElectionDetailResolverService] },
          { path: '', redirectTo: 'national', pathMatch: 'full' }
      ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
