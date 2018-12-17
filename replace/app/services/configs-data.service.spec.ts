import { TestBed, inject } from '@angular/core/testing';

import { ConfigsDataService } from './configs-data.service';

describe('ConfigsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigsDataService]
    });
  });

  it('should be created', inject([ConfigsDataService], (service: ConfigsDataService) => {
    expect(service).toBeTruthy();
  }));
});
