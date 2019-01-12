import { TestBed } from '@angular/core/testing';

import { AppEnquiriesService } from './app-enquiries.service';

describe('AppEnquiriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppEnquiriesService = TestBed.get(AppEnquiriesService);
    expect(service).toBeTruthy();
  });
});
