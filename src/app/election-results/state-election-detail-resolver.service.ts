import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { StateInfoService } from '../state-info.service';

@Injectable()
export class StateElectionDetailResolverService implements Resolve<any> {

  constructor(private router: Router, private stateInfoService: StateInfoService) { }

  resolve(route: ActivatedRouteSnapshot) {
    let specifiedStateAbbrev = route.params['stateAbbrev'].toUpperCase();
    let specifiedState = this.stateInfoService.getStateByAbbrev(specifiedStateAbbrev);

    if (!specifiedState) {
      this.router.navigateByUrl('results');
    }

    return specifiedState;
  }

}
