import { TestBed } from '@angular/core/testing';
import { ColorService } from './color.service';
import { Color } from './color';

describe('ColorService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should correctly init the Color for the entrey #FFFFFF', () => {
    const color = Color.fromCssColor('#FFFFFF');
    expect(color.red).toBe(255);
    expect(color.green).toBe(255);
    expect(color.blue).toBe(255);
  });

  it('should correctly init the Color for the entrey #000000', () => {
    const color = Color.fromCssColor('#000000');
    expect(color.red).toBe(0);
    expect(color.green).toBe(0);
    expect(color.blue).toBe(0);
  });

  it('should correctly init the Color for the entrey #FF00FF', () => {
    const color = Color.fromCssColor('#FF00FF');
    expect(color.red).toBe(255);
    expect(color.green).toBe(0);
    expect(color.blue).toBe(255);
  });

  it('should handle only 6 chars', () => {
    expect( () => Color.fromCssColor('#1234567')).toThrow(new Error(Color.errorFormatMessage));
  });

});
