import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SkylineModule } from 'skyline';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SkylineModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
