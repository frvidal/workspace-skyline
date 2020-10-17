import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelControlComponent } from './panel-control.component';

describe('PanelControlComponent', () => {
  let component: PanelControlComponent;
  let fixture: ComponentFixture<PanelControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelControlComponent ],
      providers: [
        DatePipe
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
