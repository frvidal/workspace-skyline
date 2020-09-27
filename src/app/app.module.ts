import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SkylineComponent } from '../../projects/skyline/src/lib/skyline.component';

import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
