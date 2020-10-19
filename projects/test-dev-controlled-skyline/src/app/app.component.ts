import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ControlledRisingSkylineService } from 'controlled-rising-skyline';
import { Building, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /**
   * This observable emits a testing generated array of building.
   */
  public skyline$ = new BehaviorSubject<Building[]>([]);
  
  /**
   * Debug mode __TRUE__, __FALSE__.
   */
  private DEBUG = false;

  public constructor(
    public datePipe: DatePipe, 
    public skylineService: RisingSkylineService) {

    const upperYear = 2020;
    const upperWeek = 45;

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addDays(theDate, days) {
      return new Date(theDate.getTime() + days*24*60*60*1000);
  }
    
    const buildings: Building[] = []
    for (let id = 0; id < 100; id++) {
      
      // The building starts to rise on this date
      const startDate =new Date(randomInteger(2017, 2018), randomInteger(1,12), randomInteger(1, 27))

      // The building ends its rising on this date
      const endDate = new Date(randomInteger(2019, 2020), randomInteger(1,12), randomInteger(1, 27))
      if (this.DEBUG) {
        console.groupCollapsed ('Project starts from %s (week %s) to %s (week %s) for id %d',
          this.datePipe.transform(startDate, 'yyyy/MM/dd'), 
          this.datePipe.transform(startDate, 'w'), 
          this.datePipe.transform(endDate, 'yyyy/MM/dd'), 
          this.datePipe.transform(endDate, 'w'), 
          id);
        for (let d = startDate.clone(); d < endDate; d.addDays(7)) {
          console.log (this.skylineService.toYearWeek(startDate).year + ' ' + this.skylineService.toYearWeek(startDate).week);
        }
        console.groupEnd();
      }
     
      for (let d = startDate.clone(), stepHeight = 1; d <= endDate; d.addDays(7), stepHeight++) {
        buildings.push(new Building(id, this.skylineService.toYearWeek(d).year, this.skylineService.toYearWeek(d).week, 40, stepHeight*2, randomInteger(0, 100), 'Building ' + id));
      }

    }
    this.skyline$.next(buildings);

  }

}
