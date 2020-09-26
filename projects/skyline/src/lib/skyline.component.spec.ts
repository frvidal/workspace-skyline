import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColorService } from './service/color.service';

import { SkylineComponent } from './skyline.component';

describe('SkylineComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  @Component({
		selector: 'app-host-component',
    template: `
            <rising-skyline
              [height] = "370"
              [width] = "1200"
              [startingColor] = "'#FFFFFF'"
              [endingColor] = "'#000000'"
            >
            </rising-skyline>
          `
	})
	class TestHostComponent {
	}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent, SkylineComponent ],
      providers: [ColorService]
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
