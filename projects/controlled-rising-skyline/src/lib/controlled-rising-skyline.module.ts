import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelControlComponent } from './panel-control/panel-control.component';
import { MatSliderModule } from '@angular/material/slider';
import { RisingSkylineModule } from 'rising-skyline';
import { ControlledRisingSkylineComponent } from './controlled-rising-skyline.component';

@NgModule({
  declarations: [ControlledRisingSkylineComponent, PanelControlComponent],
  imports: [
    CommonModule,
    RisingSkylineModule,
    MatSliderModule
  ],
  providers: [],
  exports: [ControlledRisingSkylineComponent]
})
export class ControlledRisingSkylineModule { }
