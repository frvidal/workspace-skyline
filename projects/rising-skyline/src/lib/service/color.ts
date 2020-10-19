/**
 * A simple color defined by its value in red, green, blue
 */

import { Type } from '@angular/core';

export class Color {

    public static errorFormatMessage = 'Color should be designed with format #999999.';

    static fromCssColor(color: string): Color {
        if (color.length !== 7) {
            throw new Error(this.errorFormatMessage);
        }
        const red = parseInt(color.substring(1, 3), 16);
        const green = parseInt(color.substring(3, 5), 16);
        const blue = parseInt(color.substring(5), 16);
        return new Color(red, green, blue);
    }

    constructor(
        public red: number,
        public green: number,
        public blue: number) {}
}
