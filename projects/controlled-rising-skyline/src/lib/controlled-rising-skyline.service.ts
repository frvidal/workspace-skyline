import { Injectable } from '@angular/core';
import { Building, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlledRisingSkylineService {

  constructor(public skylineService: RisingSkylineService) { }

  /**
   * Generate a random Skyline history with 100 buildings for testing purpose.
   * @param skyline$ the observable whch will emit the array of buildings
   */
  public randomSkylineHistory(skyline$: BehaviorSubject<Building[]>) {

    const upperYear = 2020;
    const upperWeek = 45;

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addDays(theDate, days) {
      return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }

    const buildings: Building[] = []


    for (let id = 0; id < 100; id++) {

      // The building starts to rise on this date
      const startDate = new Date(randomInteger(2017, 2018), randomInteger(1, 12), randomInteger(1, 27));

      // The building ends its rising on this date
      const endDate = new Date(randomInteger(2019, 2020), randomInteger(1, 12), randomInteger(1, 27));

      for (let d = startDate.clone(), stepHeight = 1; d <= endDate; d.addDays(7), stepHeight++) {
        buildings.push(new Building(id, this.skylineService.toYearWeek(d).year, this.skylineService.toYearWeek(d).week, 40, stepHeight * 2, randomInteger(0, 100), 'Building ' + id));
      }
    }

    skyline$.next(buildings);

  }

}
