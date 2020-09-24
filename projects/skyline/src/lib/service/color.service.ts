import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    constructor() { }

    static red(index: number): string {
        const s = Math.round(28 + ((139 - 28) * index) / 10).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

    static green(index: number) {
        const s = Math.round((183 - (183 * index) / 10)).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

    static blue(index: number) {
        const s = Math.round((69 - (69 * index) / 10)).toString(16).toUpperCase();
        return (s.length === 1) ? '0' + s : s;
    }

}
