import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {ControlledRisingSkylineModule} from 'controlled-rising-skyline'

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
