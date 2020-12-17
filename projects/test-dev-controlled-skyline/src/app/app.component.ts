import { Component } from '@angular/core';
import { ControlledRisingSkylineService } from 'controlled-rising-skyline';
import { Building, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject, onErrorResumeNext } from 'rxjs';
import dataOfSingleProject from './json_files/rising-skyline-data-of-single-project.json';

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
  
  public skyline = [];
  
  public constructor(
    public controlledSkylineService: ControlledRisingSkylineService,
    public skylineService: RisingSkylineService) {
      dataOfSingleProject.forEach(b => {
        this.skyline.push(new Building(b.id, b.year, b.week, b.week, b.height, b.index, b.title));
      });
    // this.controlledSkylineService.randomSkylineHistory(this.skyline$);
    this.skyline$.next(this.skyline);

    this.skyline$.subscribe({
      next: skyline => {
        console.groupCollapsed('in Subscribe');
        console.table(skyline);
        console.groupEnd();
      }
    });

  }

}
