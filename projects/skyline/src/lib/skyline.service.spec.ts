import { compileNgModuleFromRender2 } from '@angular/compiler/src/render3/r3_module_compiler';
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

  it('should correctly "FillTheHoles()" in the skyline.', () => {
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
    console.log ('nope');
    const floor = service.history
      .filter(
        floor => ((floor.id === id) && (floor.year === year) && (floor.week === week)));
    if (!floor) {
      throw new Error('Floor (' + id + ',' + year + ',' + week + ') not found');
    }
    return floor[0];
  }
});
