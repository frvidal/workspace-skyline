import { AfterViewInit, Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ColorService, RisingSkylineService } from 'rising-skyline';
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
  @HostBinding('style.--control-background-color')
  @Input() backgroundColor;

  /**
   * Slider color of the panel control
   */
  @HostBinding('style.--slider-color')
  @Input() sliderColor = 'violet';

  /**
   * __Debug__ mode default value is **False**.
   */
  @Input() debug = false;

  /**
   * The Skyline subscription.
   */
  private skylineSubscription: Subscription = null;

  constructor(public skylineService: RisingSkylineService, public colorService: ColorService) { }

  formatYearWeek = (value: number) => {
    return this.skylineService.currentYear + '/'
    + ((this.skylineService.currentWeek < 10) ? '0' + this.skylineService.currentWeek : this.skylineService.currentWeek);
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.skylineService.episode$
      .subscribe(
        floors => {
          if (floors.length > 0) {
            const allIndex = floors
              .filter(floor => floor.height > 0)
              .map(floor => floor.index)
              .reduce((theSum, index) => theSum + index, 0 );
            const meanIndex = Math.floor(allIndex / floors.filter(floor => floor.height > 0).length);
            if (this.debug)  {
              console.log ('Index of color used for the thumb coin', meanIndex);
            }

            const htmlThumbLabelCoin = document.getElementsByClassName('mat-slider-thumb-label').item(0);
            if (htmlThumbLabelCoin) {
              const color =  this.colorService.color(meanIndex);
              if (this.debug) {
                console.log ('Index of color used for the thumb coin %d is processing the color %s', meanIndex, color);
              }
              htmlThumbLabelCoin.setAttribute('style', 'background-color:' + color);
            }
        }
      });

  }

  ngOnDestroy(): void {
    if (this.skylineSubscription) {
      this.skylineSubscription.unsubscribe();
    }
  }

  onSliderChange($event: MatSliderChange): void {
    const yw = this.skylineService.yearWeeks[Math.max(0, $event.value - 2)];
    this.skylineService.currentYear = yw.year;
    this.skylineService.currentWeek = yw.week;
    this.skylineService.currentEpisode = $event.value - 2;
    if (this.debug) {
      console.log ('Position %d points to (%d; %d)', $event.value, yw.year, yw.week);
    }
    const episode = this.skylineService.extractSkylineEpisode(yw.year, yw.week);
    this.skylineService.drawEpisode(episode);
  }
}
