import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';

describe('ColorService', () => {
  let service: ColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorService);
  });

  it('should correctly handle the gradiant from #FFFFFF to #000000', () => {
    expect(service).toBeTruthy();
    service.initBoundaryColors('#FFFFFF', '#000000');
    expect(service.red(0)).toBe('FF');
    expect(service.red(100)).toBe('00');
    expect(service.red(50)).toBe('80');
  });

  it('should correctly execute the method "color"', () => {
    expect(service).toBeTruthy();
    service.initBoundaryColors('#FFFFFF', '#000000');
    expect(service.color(0)).toBe('#FFFFFF');
    expect(service.color(100)).toBe('#000000');
    expect(service.color(50)).toBe('#808080');
  });

});
