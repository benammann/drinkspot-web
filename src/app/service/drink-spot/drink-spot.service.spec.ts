import { TestBed } from '@angular/core/testing';

import { DrinkSpotService } from './drink-spot.service';

describe('DrinkSpotService', () => {
  let service: DrinkSpotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrinkSpotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
