import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { StateInfoService, StateInfo } from '../state-info.service';

@Injectable()
export class StateElectionDetailResolverService implements Resolve<any> {

  public selectedState = new BehaviorSubject<StateInfo>(null);

  constructor(private router: Router, private stateInfoService: StateInfoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let specifiedStateAbbrev = route.params['stateAbbrev'].toUpperCase();
    let specifiedState = this.stateInfoService.getStateByAbbrev(specifiedStateAbbrev);

    if (!specifiedState) {
      this.router.navigateByUrl('results');
    }

    this.selectedState.next(specifiedState);

    return specifiedState;
  }

}
