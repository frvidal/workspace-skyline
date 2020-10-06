import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterControlComponent } from './footer-control.component';

describe('FooterControlComponent', () => {
  let component: FooterControlComponent;
  let fixture: ComponentFixture<FooterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
