import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Building } from './data/building';

import { RisingSkylineService } from './rising-skyline.service';

describe('RisingSkylineService', () => {
  let service: RisingSkylineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
    service = TestBed.inject(RisingSkylineService);
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

  it('should correctly calculate the week 1 for the date 2019-12-30', () => {
    expect(service).toBeTruthy();
    expect(service.toYearWeek(new Date('2019-12-30')).week).toBe(1);
    expect(service.toYearWeek(new Date('2019-12-30')).year).toBe(2020);
  });

  it('should correctly calculate the week 1 for the date 2018-12-30', () => {
    expect(service).toBeTruthy();
    expect(service.toYearWeek(new Date('2018-12-30')).week).toBe(1);
    expect(service.toYearWeek(new Date('2018-12-30')).year).toBe(2019);
  });

  it('should correctly "takeInAccount()" a skyline', () => {
    expect(service).toBeTruthy();

    const buildings = [];
    buildings.push(new Building(1, 2019, 42, 1, 1, 1, 'Building 1'));
    buildings.push(new Building(1, 2020, 12, 1, 1, 1, 'Building 1'));
    buildings.push(new Building(1, 2019, 21, 1, 1, 1, 'Building 1'));
    buildings.push(new Building(1, 2021, 1, 1, 1, 1, 'Building 1'));

    service.takeInAccount(buildings);
    expect(service.firstDate).toEqual(service.getDateOfWeek(2019, 21));
    expect(service.lastDate).toEqual(service.getDateOfWeek(2021, 1));
  });

  it ('should "FillTheHoles()" in this FIRST example of skyline', () => {
    const buildings = [];

    buildings.push(new Building(1, 2019, 51, 10, 5, 1, 'Building 1'));
    buildings.push(new Building(1, 2019, 52, 10, 10, 1, 'Building 1'));

    let step = 1;
    buildings.push(new Building(2, 2019, 49, 10, 5  * step++, 1, 'Building 2'));
    buildings.push(new Building(2, 2019, 50, 10, 5  * step++, 1, 'Building 2'));
    buildings.push(new Building(2, 2019, 51, 10, 5  * step++, 1, 'Building 2'));
    buildings.push(new Building(2, 2019, 52, 10, 5  * step++, 1, 'Building 2'));
    buildings.push(new Building(2, 2020, 1, 10, 5  * step++, 1, 'Building 2'));
    buildings.push(new Building(2, 2020, 2, 10, 5  * step++, 1, 'Building 2'));

    expect(service).toBeTruthy();
    expect(buildings.length).toBe(8);
    service.takeInAccount(buildings);
    service.fillTheHoles();

    console.groupCollapsed('history content');
    service.history.forEach(building => {
      console.log (building.id + ' ' + building.year + ' ' + building.week + ' ' + building.height);
    });
    console.groupEnd();

    expect(service.history.length).toBe(12);

  });

  it('should correctly "FillTheHoles()" in this SECOND skyline.', () => {
    expect(service).toBeTruthy();

    const buildings = [];
    buildings.push(new Building(1, 2019, 22, 10, 4, 1, 'Building 1'));
    buildings.push(new Building(1, 2019, 21, 10, 2, 1, 'Building 1'));
    buildings.push(new Building(2, 2020, 30, 10, 1, 1, 'Building 2'));
    buildings.push(new Building(1, 2019, 20, 10, 1, 1, 'Building 1'));
    buildings.push(new Building(2, 2020, 31, 10, 10, 1, 'Building 2'));

    service.takeInAccount(buildings);
    service.fillTheHoles();
    expect(service.firstDate).toEqual(service.getDateOfWeek(2019, 20));
    expect(service.lastDate).toEqual(service.getDateOfWeek(2020, 31));

    expect(floor(2, 2020, 20)).toBeDefined();
    expect(floor(2, 2020, 20).height).toBe(0);

    let previousFloor = null;
    service.sortedHistory().forEach(entry => {
      if (previousFloor) {
        if ((previousFloor.year === entry.year) && (previousFloor.week === entry.week)) {
          throw new Error('Doublon record for ' + entry.id + ' ' + entry.year + ' ' + entry.week);
        }
      }
      previousFloor = entry;
    });

  });

  /**
   * Return the floor associated to a week.
   * @param id the project identifier
   * @param year the given year
   * @param week the given week
   */
  function floor(id: number, year: number, week: number): Building {
    const foundFloor = service.history
      .filter(
        entry => ((entry.id === id) && (entry.year === year) && (entry.week === week)));
    if (!foundFloor) {
      throw new Error('Floor (' + id + ',' + year + ',' + week + ') not found');
    }
    return foundFloor[0];
  }
});
