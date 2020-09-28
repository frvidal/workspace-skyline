import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Building } from './data/building';

@Injectable({
  providedIn: 'root'
})
export class SkylineService {
  
  /**
   * Activate or Inactivate the Debug mode for this service __True__ or __False__
   */
  private DEBUG = true;

  /**
   * Date when the first floor of the first building has been created.
   */
  public firstDate: Date;
  
  /**
   * Date when the last floor of the last building has been created.
   */
  public lastDate: Date;
  
  /**
   * **BehaviorSubject** emitting the skyline to be drawn
   */
  public skyline$ = new BehaviorSubject<Building[]>([]);

  /**
   * The active skyline for the current year/week.
   */
  public skyline: Building[] = [];
  
  /**
   * The complete history of the skyline : all floors by year/week are stored in this array.
   */
  public history: Building[] = [];
  
  /**
   * Identifier for the rising loop interval.
   */
  private intervalId: number;

  constructor() { }
  
  /**
   * Produce the rising of the skyline.
   */
  riseBuilding() {
    const year = 2018;
    const week = 10;
    function floor(building: Building) {
      return (building.year === year) && (building.week === week)    
    }
    this.intervalId = setInterval( () => {
      this.skyline = this.history.filter(floor);
      if (this.DEBUG) {
        console.log ('The skyline contains ' + this.skyline.length + ' buildings.');
      }
      this.skyline$.next(this.skyline);
      setTimeout(() => clearInterval(this.intervalId), 0);
    }, 1000);
  }

  /**
   * Zoom-in the graph.
   */
  public zoomIn() {
    if (this.DEBUG) {
      console.log ('Zoom IN');
    }
    this.skyline.forEach(building => {
      building.width = building.width * 1.1;
      building.height = building.height * 1.1;
    });
  }

  /**
   * Zoom-our the graph.
   */
  public zoomOut() {
    if (this.DEBUG) {
      console.log ('Zoom OUT');
    }
    this.skyline.forEach(building => {
      building.width = building.width / 1.1;
      building.height = building.height / 1.1;
    });
  }

  /**
   * Return the date of the first week day : a **MONDAY** in this implementation.
   * @param year the year of the date
   * @param week the week the week of the date 
   */
  public getDateOfWeek(year: number, week: number) {
    // The week number 1 of a year, has to contain the first civil thursday of this year.
    const newYearsDayOffset =  (new Date(year, 0, 1).getDay() <= 4) ? 0 : 1;

    let date = new Date(year, 0, (1 + (newYearsDayOffset + week - 1) * 7)); 
    date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
    return date;
  }
}
