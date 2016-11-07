/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StateInfoService } from './state-info.service';

describe('Service: StateInfo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateInfoService]
    });
  });

  it('should ...', inject([StateInfoService], (service: StateInfoService) => {
    expect(service).toBeTruthy();
  }));
});
