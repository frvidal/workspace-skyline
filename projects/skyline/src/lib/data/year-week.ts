/**
 * This object represents the couple year/week.
 */
export class YearWeek {

    constructor(public year: number, public week: number) {}
    
    public toString(): string {
        return  this.year + ' ' + this.week;
    }
}