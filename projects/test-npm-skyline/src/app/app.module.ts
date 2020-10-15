import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelControlComponent } from './footer-control/panel-control.component';
import { ColorService } from 'projects/skyline/src/lib/service/color.service';
import { SkylineService } from 'projects/skyline/src/lib/skyline.service';
import { SkylineComponent } from 'projects/skyline/src/lib/skyline.component';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent, PanelControlComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe, ColorService, SkylineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
