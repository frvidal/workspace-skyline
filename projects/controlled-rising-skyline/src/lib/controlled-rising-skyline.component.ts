import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Building, SkylineService } from 'rising-skyline';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'controlled-rising-skyline',
  templateUrl: './controlled-rising-skyline.html',
  styleUrls: ['./controlled-rising-skyline.css']
})
export class ControlledRisingSkylineComponent implements OnInit, AfterViewInit {

  /**
   * The width of the component, with its unit of measure.
   * Defaut value is __600__;
   */
  @Input()
  public width = 600; 

  /** 
   * The unit of measure for the width.
   * 
   * Default value is _'px'_
   */
  @Input() umWidth = 'px';

  /**
   * The height of the component, with its unit of measure.
   * Defaut value is _400_;
   */
  @Input()
  public height = 400; 

  /** 
   * The unit of measure for the height.
   * 
   * Default value is _'px'_
   */
  @Input() umHeight = 'px';

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
  public endingColor = 'pink';

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

  /**
   * DEBUG mode _True_, _False_
   */
  private DEBUG = true;

  /**
   * The width of the skyline
   */
  public widthSkyline: number;

  /**
   * The height of the skyline
   */
  public heightSkyline: number;

  constructor(public skylineService: SkylineService) {
  }
  
  
  ngOnInit(): void {
    this.widthSkyline = this.width;
    this.heightSkyline = Math.floor(this.height * 0.8);
    console.log('Skyline w '+ this.widthSkyline + ' ' + this.heightSkyline);

    this.subscriptionSkyline = this.skylineService.episode$.subscribe(floors => {
      this.positionOfFloor++;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionSkyline.unsubscribe();
  }
 
  /**
   * After view initialization : Here, we set the width of the container.
   */
  ngAfterViewInit(): void {
    const mainDiv = document.getElementById('mainDiv');
    if (mainDiv) {
      mainDiv.setAttribute('style', 'width:' + this.width + 'px;height:' + this.height + 'px');
      if (this.DEBUG) {
        console.log(mainDiv.getAttribute('style'));
      }
    } else {
      console.error('INTERNAL ERROR : Did not retrieve the main div')
    }
  }
}
