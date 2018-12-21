import { TestBed } from '@angular/core/testing';

import { UserUploadService } from './user-upload.service';

describe('UserUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserUploadService = TestBed.get(UserUploadService);
    expect(service).toBeTruthy();
  });
});
