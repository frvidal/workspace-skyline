import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatSliderModule} from '@angular/material/slider';
import {RisingSkylineModule} from 'rising-skyline'
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelControlComponent } from './footer-control/panel-control.component';

@NgModule({
  declarations: [
    AppComponent, PanelControlComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatSliderModule,
    BrowserAnimationsModule,
    RisingSkylineModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
