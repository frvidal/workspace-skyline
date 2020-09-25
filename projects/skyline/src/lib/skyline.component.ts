import { BoundAttribute } from '@angular/compiler/src/render3/r3_ast';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';
import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import {Building} from './data/building';
import {ColorService} from './service/color.service';

@Component({
	selector: 'rising-skyline',
	templateUrl: './skyline.component.html',
	styleUrls: ['./skyline.component.css']
})
export class SkylineComponent implements OnInit, AfterViewInit {

  public skyline: Building[] = [];

  /** 
   * The width of the container
   */
  @Input() width: number;
  
  /** 
   * The height of the container
   */
  @Input() height: number;

  constructor(private colorService: ColorService) { }

  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.skyline.push(new Building(i, 40, 20 + (i%5)*30, (i%10)));
    }
  }
  
  ngAfterViewInit() {    
  }

  style(building: Building) {
    const style = 'width:' + building.width + 'px; height:' + building.height + 'px;' + 
      'background-color: ' + this.color(building.risk) + 
      '; margin-left: 2px; position: relative;top:'+ (this.height*0.94-building.height) + 'px'; 
    return style;
  }

  color(risk: number) {
    return '#' + ColorService.red(risk) + ColorService.green(risk) + ColorService.blue(risk);
  }

  zoomIn() {
    this.skyline.forEach(building => {
      building.width = building.width * 1.1;
      building.height = building.height * 1.1;
    });
  }

  zoomOut() {
    this.skyline.forEach(building => {
      building.width = building.width / 1.1;
      building.height = building.height / 1.1;
    });
  }

  skylineStyle() {
    const style = 'width:'+this.width+'px; height:'+this.height+'px';
    console.log (style);
    return style;
  }
}
