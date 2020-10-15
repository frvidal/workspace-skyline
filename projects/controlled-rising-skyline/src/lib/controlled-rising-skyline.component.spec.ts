import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlledRisingSkylineComponent } from './controlled-rising-skyline.component';

describe('ControlledRisingSkylineComponent', () => {
  let component: ControlledRisingSkylineComponent;
  let fixture: ComponentFixture<ControlledRisingSkylineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlledRisingSkylineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlledRisingSkylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
