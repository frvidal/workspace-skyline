import { TestBed } from '@angular/core/testing';
import { SpeedVariation } from './speed-variation';

describe('SpeedVariation', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should handle the next (for variation = 1)', () => {    
    const val = SpeedVariation.next({'title':'nope', acceleration: 1});
    expect(val.acceleration).toBe(2);
  });

  it('should handle the next (for variation = 0.25)', () => {    
    const val = SpeedVariation.next({'title':'nope', acceleration: 0.5});
    expect(val.acceleration).toBe(1);
  });

});
