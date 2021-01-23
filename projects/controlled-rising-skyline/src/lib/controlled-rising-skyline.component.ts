import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Building, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'controlled-rising-skyline',
  templateUrl: './controlled-rising-skyline.html',
  styleUrls: ['./controlled-rising-skyline.css']
})
export class ControlledRisingSkylineComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * The width of the container, with its units of mesure (px, %, em...).
   * Defaut value is __'600px'__;
   */
  @Input()
  public width = '600px';

  /**
   * The height of the container, with its units of mesure (px, %, em...).
   * Defaut value is _'400px'_;
   */
  @Input()
  public height = '400px';

  /**
   * The margin around the container.
   * Defaut value is _'10px'_;
   */
  @Input()
  public margin = '10px';

  /**
  /**
   * The width of each building on the skyline without the unit of measure.
   * Defaut value is __40__;
   */
  @Input()
  public buildingWidth = 40;

  /**
   * The unit of measure for the width.
   *
   * Default value is _'px'_
   */
  @Input() umBuildingWidth = 'px';

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
   * __Starting__ color of the color gradation.
   * Default value is _ping_
   */
  @Input()
  public startingColor = 'red';

  /**
   *  __Ending__ color of the color gradation.
   * Default value is _blue_
   */
  @Input()
  public endingColor = 'green';

  /**
   * Color of the skyline container
   */
  @HostBinding('style.--skyline-background-color')
  @Input() skylineBackgroundColor = 'transparent';

  /**
   * Color of the skyline control panel
   */
  @Input() controlBackgroundColor = 'lightGrey';

  /**
   *  __Slider__ color.
   * Default value is _violet_
   */
  @Input()
  public sliderColor = 'violet';

  /**
   *  (_Internal_) debug mode.
   * Default value is **false**
   */
  @Input()
  public debug = false;

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

  constructor(public skylineService: RisingSkylineService) {
  }


  ngOnInit(): void {
    if (this.debug) {
      console.log('Skyline w ' + this.width + ', h ' + this.height);
    }

    this.subscriptionSkyline = this.skylineService.episode$.subscribe(floors => {
      this.positionOfFloor++;
    });
  }

  /**
   * After view initialization : Here, we set the width of the container.
   */
  ngAfterViewInit(): void {
    const mainDiv = document.getElementById('mainDiv');
    if (mainDiv) {
      mainDiv.setAttribute('style', 'width:' + this.width + 'px;height:' + this.height + 'px');
      if (this.debug) {
        console.log(mainDiv.getAttribute('style'));
      }
    } else {
      console.error('INTERNAL ERROR : Did not retrieve the main div');
    }
  }

  ngOnDestroy(): void {
    this.subscriptionSkyline.unsubscribe();
  }
}
