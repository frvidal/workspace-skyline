import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SkylineComponent } from '../../projects/skyline/src/lib/skyline.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent, SkylineComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
