import { TestBed } from '@angular/core/testing';

import { OtheruserService } from './otheruser.service';

describe('OtheruserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OtheruserService = TestBed.get(OtheruserService);
    expect(service).toBeTruthy();
  });
});
