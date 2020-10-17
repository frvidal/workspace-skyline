import { Component, Input, OnInit } from '@angular/core';
import { Building, SkylineService } from 'rising-skyline';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'controlled-rising-skyline',
  templateUrl: './controlled-rising-skyline.html',
  styleUrls: ['./controlled-rising-skyline.css']
})
export class ControlledRisingSkylineComponent implements OnInit {

  /**
   * The width of the component.
   * Defaut value is __600__;
   */
  @Input()
  public width = 600; 

  /**
   * The height of the component.
   * Defaut value is _400_;
   */
  public height = 400; 

  /**
   * This behaviorSubject emits the complete story of the rising skyline.
   * 
   * This reveived array will be passed to the __SkylineService__. 
   */
  @Input()
  public risingSkylineHistory$ = new BehaviorSubject<Building[]>([]); 

  /**
   * Starting speed of the animation in ms.
   * Default value is _30_
   */
  @Input()
  public speed = 30;

  /**
   * __Starting__ color of he gradation speed of the animation in ms.
   * Default value is _ping_
   */
  @Input()
  public startingColor = 'pink';

  /**
   *  __Ending__ color of he gradation speed of the animation in ms.
   * Default value is _blue_
   */
  @Input()
  public EndingColor = 'pink';

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
