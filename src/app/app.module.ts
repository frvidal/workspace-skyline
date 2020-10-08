import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { SkylineComponent } from '../../projects/skyline/src/lib/skyline.component';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterControlComponent } from './footer-control/footer-control.component';
import { ColorService } from 'projects/skyline/src/lib/service/color.service';
import { SkylineService } from 'projects/skyline/src/lib/skyline.service';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent, FooterControlComponent
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
