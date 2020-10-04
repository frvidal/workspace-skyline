import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import { SkylineComponent } from '../../projects/skyline/src/lib/skyline.component';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
