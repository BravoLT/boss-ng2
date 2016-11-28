import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

import { StateInfo, StateInfoService } from '../state-info.service';
import { StateElectionDetailResolverService } from './state-election-detail-resolver.service';

@Component({
  selector: 'boss-election-results',
  template: `
    <h2>Election Results</h2>
    <span>Selected state: {{selectedState | json}}</span>
    <boss-election-map [selectedState]="selectedState?.abbrev" (stateSelected)="onStateSelected($event)"></boss-election-map>
    <md-card>
      <a md-button class="state-button" routerLink="national" routerLinkActive="active">National</a>
    </md-card>
    <md-card>
      <a md-button class="state-button" *ngFor="let state of getAllStates()"
        [routerLink]="state.abbrev" routerLinkActive="active">
        {{state.name}}
      </a>
    </md-card>
    <md-card>
      <router-outlet></router-outlet>
    </md-card>
  `,
  styles: [`
    .state-button.active {
      background-color: red;
      color: white;
    }
    md-card {
      margin-bottom: .25em;
    }
  `]
})
export class ElectionResultsComponent implements OnInit {

  public selectedState: StateInfo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private stateInfoService: StateInfoService,
    private stateResolver: StateElectionDetailResolverService) {
  }

  ngOnInit() {
    this.stateResolver.selectedState.subscribe(next => this.selectedState = next);
  }

  onStateSelected(state) {
    this.selectedState = this.stateInfoService.getStateByAbbrev(state.abbrev);
    if (state.abbrev) {
      this.router.navigate([state.abbrev], { relativeTo: this.route });
    }
  }

  getAllStates() {
    return this.stateInfoService.getAllStates();
  }

}
