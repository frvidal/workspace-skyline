import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Building, RisingSkylineModule, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject } from 'rxjs';

import { ControlledRisingSkylineComponent } from './controlled-rising-skyline.component';
import { ControlledRisingSkylineService } from './controlled-rising-skyline.service';

describe('ControlledRisingSkylineComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'lib-app-host-component',
    template: `
      <controlled-rising-skyline 
          [width] = 1200
          [height] = 400
          [risingSkylineHistory$] = skyline$
          [startingColor] = "'#FF0000'"
          [endingColor] = "'#00FF00'"
          [sliderColor]="'#0000FF'">
          `
  })
  class TestHostComponent implements OnInit {
    public skyline$ = new BehaviorSubject<Building[]>([]);
    constructor(public controlledSkyline: ControlledRisingSkylineService) {}
    ngOnInit(): void {
      this.controlledSkyline.randomSkylineHistory(this.skyline$)
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledRisingSkylineComponent ],
      imports: [RisingSkylineModule],
      providers: [RisingSkylineService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
