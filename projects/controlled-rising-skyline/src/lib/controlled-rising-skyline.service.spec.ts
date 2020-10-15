import { TestBed } from '@angular/core/testing';

import { ControlledRisingSkylineService } from './controlled-rising-skyline.service';

describe('ControlledRisingSkylineService', () => {
  let service: ControlledRisingSkylineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlledRisingSkylineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
