import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {ControlledRisingSkylineModule} from './../../../controlled-rising-skyline/src/lib/controlled-rising-skyline.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatSliderModule, ControlledRisingSkylineModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
