import { Injectable } from '@angular/core';
import {Color} from './color';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    
    /**
     * the gradiant will start from here, when the given index is equal to 0 
     */
    private startingColor: Color;
    
    /**
     * the gradiant will end to this color, when the given index is equal to 100 
     */
    private endingColor: Color;

    
    constructor() { }

    /**
     * Initialize the color boundaries
     * @param startingColor the gradiant will start from here, when the given index is equal to 0 
     * @param endingColor the gradiant will end to this color, when the given index is equal to 100 
     */
    public initBoundaryColors(startingColor: string, endingColor: string) {
        this.startingColor = Color.fromCssColor(startingColor);
        this.endingColor = Color.fromCssColor(endingColor);
    }

    public red(index: number): string {
        const s = Math.round(this.startingColor.red + ((this.endingColor.red - this.startingColor.red) * index) / 100).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

    public green(index: number) {
        const s = Math.round(this.startingColor.green + ((this.endingColor.green - this.startingColor.green) * index) / 100).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

    public blue(index: number) {
        const s = Math.round(this.startingColor.blue + ((this.endingColor.blue - this.startingColor.blue) * index) / 100).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

  /**
   * Return a color associated to the given level of risk.
   * @param level the level of the measure
   */
  color(level: number) {
    return '#' + this.red(level) + this.green(level) + this.blue(level);
  }

}
