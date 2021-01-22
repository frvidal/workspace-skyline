import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Building} from './data/building';
import {ColorService} from './service/color.service';
import {RisingSkylineService} from './rising-skyline.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'rising-skyline',
  templateUrl: './rising-skyline.component.html',
  styleUrls: ['./rising-skyline.component.css']
})
export class SkylineComponent implements OnInit, OnDestroy, AfterViewInit {

  /**
   * The width of the container, with its units of mesure (px, %, em...).
   */
  @HostBinding('style.--container-width')
  @Input() width: string;

  /**
   * The height of the container with the unit of mesure such as ('px', 'em', '%')
   */
  @HostBinding('style.--container-height')
  @Input() height: string;

  /**
   * This observable emits the complete story of the rising skyline.
   *
   * This reveived array will be completed and passed to the __SkylineService__.
   */
  @Input() risingSkylineHistory$;

  /**
   * Animation speed in milliseconds
   */
  @Input() speed;

  /**
   * The starting color
   *
   * The building is drawn between 2 colors : This color is the starting one.
   */
  @Input() startingColor: string;

  /**
   * The ending color
   * The building is drawn between 2 colors : This color is the ending one.
   */
  @Input() endingColor: string;

  /**
   * Component is setup in DEBUG mode
   */
  private DEBUG = false;

  /**
   * Computed heighted in __px__.
   * This number is used to locate verticaly the buildings inside the container.
   * If the given unit of measure for height is not 'px', but '%' for example, then we need to compute this height.
   */
  private computedHeightInPx = 0;

  /**
   * Building hightlighted by the mouse
   */
  private buildingSelected = null;

  /**
   * The subscription reading the flow of episodes in the animation.
   */
  private subscription: Subscription;

  constructor(
    private colorService: ColorService,
    public skylineService: RisingSkylineService) {
  }

  ngOnInit(): void {
    if (this.DEBUG) {
      console.log ('Colors start from %s to %s', this.startingColor, this.endingColor);
    }
    this.colorService.initBoundaryColors(this.startingColor, this.endingColor);

    this.subscription = this.risingSkylineHistory$.subscribe({
      next: buildings => {
        if (buildings.length !== 0) {
          this.skylineService.injectSpeed(this.speed);
          this.skylineService.takeInAccount(buildings);
          this.skylineService.fillTheHoles();

          this.skylineService.startSkylineRising();
        }
      }
    });

  }

  /**
   * After viw processing.
   */
  ngAfterViewInit(): void {
    const htmlContainer = document.getElementsByClassName('container-fluid').item(0);
    if (htmlContainer) {
      this.computedHeightInPx = htmlContainer.clientHeight;
      if (this.DEBUG) {
        console.log ('Computed heigth', this.computedHeightInPx);
      }
    } else {
      console.error('INTERNAL ERROR : Cannot retrieve the div container');
    }

}

  /**
   * Mouse is over the building.
   */
  public mouseOverBuilding(building: Building): void {
    this.buildingSelected = building;
  }

  /**
   * Mouse is out of the building.
   */
  public mouseOutBuilding(): void {
    this.buildingSelected = null;
  }

  /**
   * Return the style of the bulding, based on this floor.
   * @param building the given building
   */
  style(building: Building): string {
    const style =
      'width:' + building.width + 'px; height:' + building.height + 'px;' +
      'background-color: ' + this.color(building.index) +
      '; margin-left: 2px; position: relative;top:' + (this.computedHeightInPx * 0.99 - building.height) + 'px';
    return style;
  }

  /**
   * Each DIV is drawn in a color corresponding to a level in a range of colors.
   * @param level the level of the measure
   */
  color(level: number): string {
    return '#' + this.colorService.red(level) + this.colorService.green(level) + this.colorService.blue(level);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
