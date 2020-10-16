import { Component, Input, OnInit } from '@angular/core';
import { Building, SkylineService } from 'rising-skyline';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'controlled-rising-skyline',
  templateUrl: './controlled-rising-skyline.html',
  styleUrls: ['./controlled-rising-skyline.css']
})
export class ControlledRisingSkylineComponent implements OnInit {

  @Input()
  public skyline$ = new BehaviorSubject<Building[]>([]); 

  /**
   * The number of floors _(or episodes)_ involved in the skyline, starting from skyline.startDate to skyline.lastDate
   */
  public numberOfFloors;

  /**
   * The current position of floor _(or episode)_ being drawn.
   */
  public positionOfFloor = 0;

  /**
   * The subscription on the skyline rising.
   */
  private subscriptionSkyline: Subscription;

  constructor(public skylineService: SkylineService) { }

  ngOnInit(): void {
    this.subscriptionSkyline = this.skylineService.episode$.subscribe(floors => {
      this.positionOfFloor++;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionSkyline.unsubscribe();
  }
 
}
