import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ControlledRisingSkylineComponent} from '../../../controlled-rising-skyline/src/lib/controlled-rising-skyline.component';
import {PanelControlComponent} from '../../../controlled-rising-skyline/src/lib/panel-control/panel-control.component';
import {SkylineComponent} from '../../../skyline/src/lib/skyline.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [
    AppComponent,
    ControlledRisingSkylineComponent,
    SkylineComponent,
    PanelControlComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatSliderModule

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
