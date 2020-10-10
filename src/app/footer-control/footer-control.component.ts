import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ColorService } from 'projects/skyline/src/lib/service/color.service';
import { SkylineService } from 'projects/skyline/src/lib/skyline.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer-control',
  templateUrl: './footer-control.component.html',
  styleUrls: ['./footer-control.component.css']
})
export class FooterControlComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * The Skyline subscription.
   */
  private skylineSubscription: Subscription = null;

  /**
   * Debug mode YES/NO.
   */
  private DEBUG = false;

  constructor(public skylineService: SkylineService, public colorService: ColorService) { }

  formatYearWeek = (value: number) => {
    return this.skylineService.currentYear + '/' 
    + ((this.skylineService.currentWeek < 10) ? '0' + this.skylineService.currentWeek : this.skylineService.currentWeek);
  }
  
  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.skylineService.episode$.subscribe(
      floors => {
        if (floors.length > 0) {
          const allIndex = floors.filter(floor => floor.height > 0).map(floor => floor.index).reduce((theSum, index) => { return theSum + index; }, 0 );
          const meanIndex = Math.floor(allIndex / floors.filter(floor => floor.height > 0).length);
          if (this.DEBUG) {
            console.log ('Index of color used for the thumb coin', meanIndex);
          }

          const htmlThumbLabelCoin = document.getElementsByClassName('mat-slider-thumb-label').item(0);
          if (htmlThumbLabelCoin) {
            const color =  this.colorService.color(meanIndex);
            if (this.DEBUG) {
              console.log ('Index of color used for the thumb coin %d is processing the color', meanIndex, color);
            }
            htmlThumbLabelCoin.setAttribute('style', 'background-color:'+color);
          }
      } 
      });
  }

  ngOnDestroy(): void {
    if (this.skylineSubscription) {
      this.skylineSubscription.unsubscribe();
    }
  }

  onSliderChange($event: MatSliderChange) {
    const yw = this.skylineService.yearWeeks[Math.max(0, $event.value-2)];
    this.skylineService.currentYear = yw.year;
    this.skylineService.currentWeek = yw.week;
    this.skylineService.currentFloor = $event.value-2;
    if (this.DEBUG) {
      console.log ('Position %d points to (%d; %d)', $event.value, yw.year, yw.week);
    }
    const episode = this.skylineService.extractSkylineEpisode(yw.year, yw.week);
    this.skylineService.drawEpisode(episode);
  }
}
