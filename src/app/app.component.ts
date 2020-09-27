import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Building } from 'projects/skyline/src/lib/data/building';
import { BehaviorSubject } from 'rxjs';
import './date.extension';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  public skyline$ = new BehaviorSubject<Building[]>([]);
  
  private DEBUG = false;

  constructor(public datePipe: DatePipe) {
    
    const upperYear = 2020;
    const upperWeek = 45;

    function randomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function addDays(theDate, days) {
      return new Date(theDate.getTime() + days*24*60*60*1000);
  }
  
  /*
    function getNumberOfWeek(): number {
      const today = new Date();
      const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
      const pastDaysOfYear = (today.valueOf() - firstDayOfYear.valueOf()) / 86400000;
      return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
    */
    
    const buildings: Building[] = []
    for (let id = 0; id < 100; id++) {
      
      // The building starts to rise on this date
      const startDate =new Date(randomInteger(2017, 2018), randomInteger(1,12), randomInteger(1, 27))

      // The building ends its rising on this date
      const endDate = new Date(randomInteger(2019, 2020), randomInteger(1,12), randomInteger(1, 27))
      if (this.DEBUG) {
        console.groupCollapsed ('Project starts from %s (week %d) to %s (week %d) for id %d',
          this.datePipe.transform(startDate, 'yyyy/MM/dd'), 
          startDate.getWeek(), 
          this.datePipe.transform(endDate, 'yyyy/MM/dd'), 
          endDate.getWeek(), 
          id);
        for (let d = startDate.clone(); d < endDate; d.addDays(7)) {
          console.log (startDate.getFullYear() + ' ' + startDate.getWeek());
        }
        console.groupEnd();
      }
     
      for (let d = startDate.clone(), stepHeight = 1; d <= endDate; d.addDays(7), stepHeight++) {
        buildings.push(new Building(id, d.getFullYear(), d.getWeek(), 40, stepHeight*3, randomInteger(0, 100)));
      }

    }
    this.skyline$.next(buildings);
  }

}
