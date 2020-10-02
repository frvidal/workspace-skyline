import { Injectable } from '@angular/core';
import { BehaviorSubject, using } from 'rxjs';
import { Building } from './data/building';
import './date.extension';

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

  /**
   * the Level of zoom.
   */
  private levelOfZoom: number = 0.5;

  /**
   * Default speed of the animation.
   */
  private speed = 1000;

  constructor() { }
  
  /**
   * Inject the speed of the animation, received by the component. 
   * @param speed the speed of the animation
   */
  injectSpeed(speed: number) {
    if (speed) {
      this.speed = speed;
    }
  }

  /**
   * Produce the rising of the skyline.
   */
  riseBuilding() {
    let year = this.firstDate.getFullYear();
    let week = this.firstDate.getWeek();
    function floor(building: Building) {
      return (building.year === year) && (building.week === week)    
    }
    this.intervalId = setInterval( () => {
      this.skyline = this.history.filter(floor);
      this.zoom(this.skyline);
      if (this.DEBUG) {
        console.log ('The skyline contains ' + this.skyline.length + ' buildings.');
      }

      const date = this.getDateOfWeek(year, week);
      const dateNextWeek = date.addDays(7); 
      if (dateNextWeek > dateNextWeek) {
        setTimeout(() => clearInterval(this.intervalId), 0);
      } else {
        year = dateNextWeek.getFullYear();
        week = dateNextWeek.getWeek();        
        this.skyline$.next(this.skyline);
      }
    }, this.speed);
  }

  /**
   * Complete the skyline perspective by filling the holes.
   */
  public fillTheHoles() {
    const ids = [... new Set(this.history.map(building => building.id))];
    const buildings = this.history.sort((a, b) => {
      return (a.id*100000 + a.year*100 + a.week)  - (b.id*100000 + b.year*100 + b.week);
    });
    ids.forEach(id => {

      const firstFloor = this.history
        .filter(building => building.id === id)
        .reduce((eligibleBuilding, building) => {
          return ( (building.year * 100 + building.week) < (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
            building : eligibleBuilding;
      });
      const startDate = this.getDateOfWeek(firstFloor.year, firstFloor.week);
      
      const lastFloor = this.history
        .filter(building => building.id === id)
        .reduce((eligibleBuilding, building) => {
          return ( (building.year * 100 + building.week) > (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
            building : eligibleBuilding;
      });
      const lastDate = this.getDateOfWeek(lastFloor.year, lastFloor.week).addDays(7);

      for (let d = this.firstDate.clone(); d < startDate; d.addDays(7)) {
        this.history.push(new Building(id, d.getFullYear(), d.getWeek(), 40, 0, 0));
      }
      for (let d = lastDate.clone(); d < this.lastDate; d.addDays(7)) {
        this.history.push(new Building(id, d.getFullYear(), d.getWeek(), 40, lastFloor.height, lastFloor.index));
      }
    });
    this.history = this.history.sort((a, b) => {
      return (a.id*100000 + a.year*100 + a.week)  - (b.id*100000 + b.year*100 + b.week);
    });
  }

  /**
   * Return the order history of skylines by id, year & week
   * Sort in ascending order the history of skylines by id, year & week
   */
  sortedHistory(): Building[] {
    return this.history.sort((a, b) => {
      return (a.id*100000 + a.year*100 + a.week)  - (b.id*100000 + b.year*100 + b.week);
    });
  }

  /**
   * Zoom IN or OUT the skyline
   * @param buildings the skyline
   */
  zoom(buildings: Building[]) {
    buildings.forEach(building => building.zoom(this.levelOfZoom));
  }

  /**
   * Zoom-in the graph.
   */
  public zoomIn() {
    if (this.DEBUG) {
      console.log ('Zoom IN');
    }
    this.levelOfZoom = this.levelOfZoom * 1.1;
  }

  /**
   * Zoom-our the graph.
   */
  public zoomOut() {
    if (this.DEBUG) {
      console.log ('Zoom OUT');
    }
    this.levelOfZoom = this.levelOfZoom / 1.1;
  }

  public takeInAccount(buildings: Building[]) {
    this.history = buildings;
    const firstBuilding = this.history.reduce((eligibleBuilding, building) => {
      return ( (building.year * 100 + building.week) < (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
        building : eligibleBuilding;
      
    });
    const lastBuilding = this.history.reduce((eligibleBuilding, building) => {
      return ( (building.year * 100 + building.week) > (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
        building : eligibleBuilding;
      
    });
    if (this.DEBUG) {
      console.log ('FIRST Building has been placed on week %d year %d', firstBuilding.week, firstBuilding.year);
      console.log ('LAST Building has been placed on week %d year %d', lastBuilding.week, lastBuilding.year);
    }
    this.firstDate = this.getDateOfWeek(firstBuilding.year, firstBuilding.week);
    this.lastDate = this.getDateOfWeek(lastBuilding.year, lastBuilding.week);
  }


  /**
   * Return the date of the first week day : a **MONDAY** in this implementation.
   * 
   * **Should you use later :** const todayFormated = this.datepipe.transform(today, 'w');.
   * 
   * @param year the year of the date
   * @param week the week the week of the date 
   */
  public getDateOfWeek(year: number, week: number) {
    // The week number 1 of a year, has to contain the first civil thursday of this year.
    const firstWeekOffset =  (new Date(year, 0, 1).getDay() <= 4) ? 0 : 1;

    let date = new Date(year, 0, (1 + (firstWeekOffset + week - 1) * 7)); 
    date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
    return date;
  }
}
