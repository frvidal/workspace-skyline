import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlledRisingSkylineComponent } from './controlled-rising-skyline.component';
import {ColorService, SkylineModule, SkylineService} from 'rising-skyline'
import { PanelControlComponent } from './panel-control/panel-control.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [ControlledRisingSkylineComponent, PanelControlComponent],
  imports: [
    CommonModule,
    SkylineModule,
    MatSliderModule
  ],
  providers: [DatePipe, ColorService, SkylineService],
  exports: [ControlledRisingSkylineComponent]
})
export class ControlledRisingSkylineModule { }
