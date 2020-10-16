import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ColorService, SkylineService } from 'rising-skyline';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-panel-control',
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css']
})
export class PanelControlComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Background color of the control footer panel
   */
  @Input() backgroundColor;

  /**
   * This boolean saves the fact that the background color has already been set for this control panel.
   * We keep this state for performance purpose.
   */
  private coloringDone = false;

  /**
   * The Skyline subscription.
   */
  private skylineSubscription: Subscription = null;

  /**
   * __Debug__ mode YES/NO.
   */
  private DEBUG = false;

  /**
   * __Verbose__ mode YES/NO.
   */
  private VERBOSE = false;

  constructor(public skylineService: SkylineService, public colorService: ColorService) { }

  formatYearWeek = (value: number) => {
    return this.skylineService.currentYear + '/' 
    + ((this.skylineService.currentWeek < 10) ? '0' + this.skylineService.currentWeek : this.skylineService.currentWeek);
  }
  
  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.skylineService.episode$
      .pipe(tap( floors => { if (!this.coloringDone) { setTimeout (() => this.setBackgroundColor(), 0);}  }))
      .subscribe(
        floors => {
          if (floors.length > 0) {
            const allIndex = floors.filter(floor => floor.height > 0).map(floor => floor.index).reduce((theSum, index) => { return theSum + index; }, 0 );
            const meanIndex = Math.floor(allIndex / floors.filter(floor => floor.height > 0).length);
            if ((this.DEBUG) && (this.VERBOSE)) {
              console.log ('Index of color used for the thumb coin', meanIndex);
            }

            const htmlThumbLabelCoin = document.getElementsByClassName('mat-slider-thumb-label').item(0);
            if (htmlThumbLabelCoin) {
              const color =  this.colorService.color(meanIndex);
              if ((this.DEBUG) && (this.VERBOSE)) {
                console.log ('Index of color used for the thumb coin %d is processing the color %s', meanIndex, color);
              }
              htmlThumbLabelCoin.setAttribute('style', 'background-color:'+color);
            } 
        } 
      });

  }

  private setBackgroundColor() {
    const slider = document.getElementById('controlPanel');
    if (slider) {
      slider.setAttribute('style', 'background-color:' + this.backgroundColor);
    }
    if (this.DEBUG) {
      console.log ('Background color for the control Panel has been set to %s', this.backgroundColor);
    }
    this.coloringDone = true;
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
    this.skylineService.currentEpisode = $event.value-2;
    if (this.DEBUG) {
      console.log ('Position %d points to (%d; %d)', $event.value, yw.year, yw.week);
    }
    const episode = this.skylineService.extractSkylineEpisode(yw.year, yw.week);
    this.skylineService.drawEpisode(episode);
  }
}
