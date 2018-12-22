import { TestBed } from '@angular/core/testing';

import { TgmService } from './tgm.service';

describe('TgmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TgmService = TestBed.get(TgmService);
    expect(service).toBeTruthy();
  });
});
