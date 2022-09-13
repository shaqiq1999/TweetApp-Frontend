import { TestBed } from '@angular/core/testing';

import { TweetsDataService } from './tweets-data.service';

describe('TweetsDataService', () => {
  let service: TweetsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweetsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
