import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RisingSkylineModule } from 'rising-skyline';

import { ControlledRisingSkylineService } from './controlled-rising-skyline.service';

describe('ControlledRisingSkylineService', () => {
  let service: ControlledRisingSkylineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RisingSkylineModule],
      providers: []
    });
    service = TestBed.inject(ControlledRisingSkylineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
