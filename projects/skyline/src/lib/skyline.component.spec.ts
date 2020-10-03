import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Building } from './data/building';
import { ColorService } from './service/color.service';

import { SkylineComponent } from './skyline.component';

describe('SkylineComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
		selector: 'app-host-component',
    template: `
            <p>Test</p>
            <rising-skyline
              [height] = 370
              [width] = 1200
              [speed] = 1000
              [skyline$] = skyline$
              [startingColor] = "'#FFFFFF'"
              [endingColor] = "'#000000'"
            >
            </rising-skyline>
          `
  })
	class TestHostComponent {
    public skyline$ = new BehaviorSubject<Building[]>([]);
	}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, SkylineComponent ],
      providers: [ColorService, DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();

    const buildings = [];
    
    buildings.push(new Building(1, 2019, 51, 10, 5, 1));
    buildings.push(new Building(1, 2019, 52, 10, 10, 1));

    let step = 1;
    buildings.push(new Building(2, 2019, 49, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 50, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 51, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2019, 52, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2020, 1, 10, 5  * step++, 1));
    buildings.push(new Building(2, 2020, 2, 10, 5  * step++, 1));

    component.skyline$.next(buildings);
    fixture.detectChanges();
  });



});
