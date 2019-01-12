import { TestBed } from '@angular/core/testing';

import { VasService } from './vas.service';

describe('VasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VasService = TestBed.get(VasService);
    expect(service).toBeTruthy();
  });
});
