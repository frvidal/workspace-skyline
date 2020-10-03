import { DatePipe } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Building } from './data/building';

import { SkylineService } from './skyline.service';

describe('SkylineService', () => {
  let service: SkylineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatePipe]
    });
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

  it('should correctly calculate the week 1 for the date 2019-12-30', () => {
    expect(service).toBeTruthy();
    expect(service.toYearWeek(new Date('2019-12-30')).week).toBe(1);
    expect(service.toYearWeek(new Date('2019-12-30')).year).toBe(2020);
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
  
  it ('should "FillTheHoles()" in this FIRST example of skyline', () => {
    const buildings = [];
    
    buildings.push(new Building(1, 2019, 51, 10, 5, 1));
    buildings.push(new Building(1, 2019, 52, 10, 10, 1));

    let step = 1;
    buildings.push(new Building(2, 2019, 49, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 50, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 51, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 52, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2020, 1, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2020, 2, 10, 5  * step++, 1));

    expect(service).toBeTruthy();
    expect(buildings.length).toBe(8);
    service.takeInAccount(buildings);
    service.fillTheHoles();

    console.groupCollapsed('history content');
    service.history.forEach(floor => {
      console.log (floor.id + ' ' + floor.year + ' ' + floor.week + ' ' + floor.height);
    });
    console.groupEnd();

    expect(service.history.length).toBe(12);

  }); 

  it('should correctly "FillTheHoles()" in this SECOND skyline.', () => {
    expect(service).toBeTruthy();

    const buildings = [];
    buildings.push(new Building(1, 2019, 22, 10, 4, 1));
    buildings.push(new Building(1, 2019, 21, 10, 2, 1));
    buildings.push(new Building(2, 2020, 30, 10, 1, 1));
    buildings.push(new Building(1, 2019, 20, 10, 1, 1));
    buildings.push(new Building(2, 2020, 31, 10, 10, 1));

    service.takeInAccount(buildings);
    service.fillTheHoles();
    expect(service.firstDate).toEqual(service.getDateOfWeek(2019, 20));
    expect(service.lastDate).toEqual(service.getDateOfWeek(2020, 31));

    expect(floor(2, 2020, 20)).toBeDefined();
    expect(floor(2, 2020, 20).height).toBe(0);

    let previousFloor = null;
    service.sortedHistory().forEach(floor => {
      if (previousFloor) {
        if ((previousFloor.year === floor.year) && (previousFloor.week === floor.week)) {
          throw new Error('Doublon record for ' + floor.id + ' ' + floor.year + ' ' + floor.week);
        }
      }
      previousFloor = floor;
    })

  });

  /**
   * Return the floor associated to a week. 
   * @param id the project identifier
   * @param year the given year
   * @param week the given week
   */
  function floor(id: number, year: number, week: number):Building {
    const floor = service.history
      .filter(
        floor => ((floor.id === id) && (floor.year === year) && (floor.week === week)));
    if (!floor) {
      throw new Error('Floor (' + id + ',' + year + ',' + week + ') not found');
    }
    return floor[0];
  }
});
