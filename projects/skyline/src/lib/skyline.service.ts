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

}
