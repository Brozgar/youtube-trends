import { TestBed } from '@angular/core/testing';

import { YoutubeApiService } from './youtube-api.service';

describe('YoutubeApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YoutubeApiService = TestBed.get(YoutubeApiService);
    expect(service).toBeTruthy();
  });
});
