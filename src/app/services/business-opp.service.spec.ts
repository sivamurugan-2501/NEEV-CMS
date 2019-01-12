import { TestBed } from '@angular/core/testing';

import { BusinessOppService } from './business-opp.service';

describe('BusinessOppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessOppService = TestBed.get(BusinessOppService);
    expect(service).toBeTruthy();
  });
});
