import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Building} from './data/building';
import {ColorService} from './service/color.service';
import {SkylineService} from './skyline.service';
import { take } from 'rxjs/operators';

@Component({
	selector: 'rising-skyline',
	templateUrl: './skyline.component.html',
	styleUrls: ['./skyline.component.css']
})
export class SkylineComponent implements OnInit, OnDestroy {

  /** 
   * The width of the container
   */
  @Input() width: number;
  
  /** 
   * The height of the container
   */
  @Input() height: number;

  /** 
   * The partial, or complete, history of the skyline rising
   */
  @Input() skyline$;

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

  constructor(
    private colorService: ColorService,
    public skylineService: SkylineService) { 
  }
  
  ngOnInit(): void {
    if (this.DEBUG) {
      console.log ('Colors start from %s to %s', this.startingColor, this.endingColor);
    }
    this.colorService.initBoundaryColors(this.startingColor, this.endingColor);
    
    this.skyline$.pipe(take(1)).subscribe({
      next: buildings => {
        if (buildings.length !== 0) {
          this.skylineService.injectSpeed(this.speed);
          this.skylineService.takeInAccount(buildings);
          this.skylineService.fillTheHoles();
          
          this.skylineService.riseSkyline();
        }
      }
    });
   
  }

  /**
   * Return the style of the bulding, based on this floor.
   * @param building 
   */
  style(floor: Building) {
    const style = 'width:' + floor.width + 'px; height:' + floor.height + 'px;' + 
      'background-color: ' + this.color(floor.index) + 
      '; margin-left: 2px; position: relative;top:'+ (this.height*0.99-floor.height) + 'px'; 
    return style;
  }

  /**
   * Each DIV is drawn in a color corresponding to a level in a range of colors.
   * @param level the level of the measure
   */
  color(level: number) {
    return '#' + this.colorService.red(level) + this.colorService.green(level) + this.colorService.blue(level);
  }

  /**
   * the style and more particularly the width & height of the skykine container
   */
  skylineStyle() {
    const style = 'width:'+this.width+'px; height:'+this.height+'px';
    return style;
  }

}
