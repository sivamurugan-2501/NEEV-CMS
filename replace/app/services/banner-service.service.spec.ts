import { TestBed, inject } from '@angular/core/testing';

import { BannerServiceService } from './banner-service.service';

describe('BannerServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BannerServiceService]
    });
  });

  it('should be created', inject([BannerServiceService], (service: BannerServiceService) => {
    expect(service).toBeTruthy();
  }));
});
