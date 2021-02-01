import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Building, RisingSkylineModule, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject } from 'rxjs';

import { ControlledRisingSkylineComponent } from './controlled-rising-skyline.component';
import { ControlledRisingSkylineService } from './controlled-rising-skyline.service';
import { PanelControlComponent } from './panel-control/panel-control.component';

describe('ControlledRisingSkylineComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
    selector: 'lib-app-host-component',
    template: `
      <div style="width:1200px; height: 600px">
        <controlled-rising-skyline 
            [debug] = true
            [width] = "'1200px'"
            [height] = "'400px'"
            [displayVerticalTitle] = true
            [risingSkylineHistory$] = skyline$
            [startingColor] = "'#FF0000'"
            [endingColor] = "'#00FF00'"
            [sliderColor]="'#0000FF'">
        </controlled-rising-skyline>
      </div>
      `
  })
  class TestHostComponent implements OnInit {
    public skyline$ = new BehaviorSubject<Building[]>([]);
    constructor(public controlledSkyline: ControlledRisingSkylineService) {}
    ngOnInit(): void {
      this.controlledSkyline.randomSkylineHistory(this.skyline$)
      this.skyline$.subscribe({
        next: buildings => {
          buildings.forEach(b => console.log(b.title));
        }
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledRisingSkylineComponent, TestHostComponent, PanelControlComponent ],
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
