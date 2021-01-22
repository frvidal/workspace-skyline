import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorService } from 'projects/rising-skyline/src/lib/service/color.service';
import { RisingSkylineService } from 'projects/rising-skyline/src/lib/rising-skyline.service';
import { SkylineComponent } from 'projects/rising-skyline/src/lib/rising-skyline.component';

import { PanelControlComponent } from 'projects/test-dev-skyline/src/footer-control/panel-control.component';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent, PanelControlComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, ColorService, RisingSkylineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
