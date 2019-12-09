import { TestBed } from '@angular/core/testing';

import { VideosManagerService } from './videos-manager.service';

describe('VideosManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideosManagerService = TestBed.get(VideosManagerService);
    expect(service).toBeTruthy();
  });
});
