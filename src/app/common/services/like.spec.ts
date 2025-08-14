import { TestBed } from '@angular/core/testing';

import { LikeService } from './like';

describe('Like', () => {
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
