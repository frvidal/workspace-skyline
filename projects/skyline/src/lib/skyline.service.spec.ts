import { TestBed } from '@angular/core/testing';

import { SkylineService } from './skyline.service';

describe('SkylineService', () => {
  let service: SkylineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkylineService);
  });

  it('should be calculate the year/week 2020/40', () => {
    expect(service).toBeTruthy();
    const d = service.getDateOfWeek(2020, 40);
    expect(d).toEqual(new Date('2020-09-28 00:00:00'));
  });

  it('should be calculate the year/week 2021/01', () => {
    expect(service).toBeTruthy();
    const d = service.getDateOfWeek(2021, 1);
    expect(d).toEqual(new Date('2021-01-04 00:00:00'));
  });

  it('should be calculate the year/week 2020/01', () => {
    expect(service).toBeTruthy();
    const d = service.getDateOfWeek(2020, 1);
    expect(d).toEqual(new Date('2019-12-30 00:00:00'));
  });

  it('should be calculate the year/week 2019/01', () => {
    expect(service).toBeTruthy();
    const d = service.getDateOfWeek(2019, 1);
    expect(d).toEqual(new Date('2018-12-31 00:00:00'));
  });

});
