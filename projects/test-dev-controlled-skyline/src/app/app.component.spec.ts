import { DatePipe } from '@angular/common';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {ControlledRisingSkylineComponent} from '../../../controlled-rising-skyline/src/lib/controlled-rising-skyline.component';
import {PanelControlComponent} from '../../../controlled-rising-skyline/src/lib/panel-control/panel-control.component';
import {SkylineComponent} from '../../../skyline/src/lib/skyline.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ControlledRisingSkylineComponent,
        SkylineComponent,
        PanelControlComponent
      ],
      imports: [
        BrowserModule, BrowserAnimationsModule, MatSliderModule    
      ],
          providers: [DatePipe],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
