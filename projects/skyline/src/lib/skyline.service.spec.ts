import { TestBed } from '@angular/core/testing';
import { Building } from './data/building';

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

  it('should correctly "takeInAccount()" a skyline', () => {
    expect(service).toBeTruthy();

    const buildings = [];
    buildings.push(new Building(1, 2019, 42, 1, 1, 1));
    buildings.push(new Building(1, 2020, 12, 1, 1, 1));
    buildings.push(new Building(1, 2019, 21, 1, 1, 1));
    buildings.push(new Building(1, 2021, 1, 1, 1, 1));

    service.takeInAccount(buildings);
    expect(service.firstDate).toEqual(service.getDateOfWeek(2019, 21));
    expect(service.lastDate).toEqual(service.getDateOfWeek(2021, 1));
  });

});
