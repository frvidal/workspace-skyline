import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {Building} from './data/building';
import {ColorService} from './service/color.service';
import {SkylineService} from './skyline.service';

@Component({
	selector: 'rising-skyline',
	templateUrl: './skyline.component.html',
	styleUrls: ['./skyline.component.css']
})
export class SkylineComponent implements OnInit, AfterViewInit {

  /** 
   * The width of the container
   */
  @Input() width: number;
  
  /** 
   * The height of the container
   */
  @Input() height: number;

  /** 
   * The height of the container
   */
  @Input() skyline$;

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
  private DEBUG = true;

  constructor(
    private colorService: ColorService,
    public skylineService: SkylineService) { 
  }
  
  ngOnInit(): void {
    if (this.DEBUG) {
      console.log ('Colors start from %s to %s', this.startingColor, this.endingColor);
    }
    this.colorService.initBoundaryColors(this.startingColor, this.endingColor);
    
    this.skyline$.subscribe({
      next: buildings => {
        if (buildings.length !== 0) {
          this.skylineService.takeInAccount(buildings);
          this.skylineService.riseBuilding();
        }
      }
    });
  }

  ngAfterViewInit() {    
  }

  style(building: Building) {
    const style = 'width:' + building.width + 'px; height:' + building.height + 'px;' + 
      'background-color: ' + this.color(building.index) + 
      '; margin-left: 2px; position: relative;top:'+ (this.height*0.94-building.height) + 'px'; 
    return style;
  }

  color(risk: number) {
    return '#' + this.colorService.red(risk) + this.colorService.green(risk) + this.colorService.blue(risk);
  }

  skylineStyle() {
    const style = 'width:'+this.width+'px; height:'+this.height+'px';
    return style;
  }
}
