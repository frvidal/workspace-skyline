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
  
  public constructor(
    public controlledSkylineService: ControlledRisingSkylineService,
    public skylineService: RisingSkylineService) {

    this.controlledSkylineService.randomSkylineHistory(this.skyline$);

  }

}
