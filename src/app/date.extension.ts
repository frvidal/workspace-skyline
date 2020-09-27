export {}

// DATE EXTENSIONS
// ================

declare global {
   interface Date {
      addDays(days: number, useThis?: boolean): Date;
      isToday(): boolean;
      getWeek(): number;
      clone(): Date;
      isAnotherMonth(date: Date): boolean;
      isWeekend(): boolean;
      isSameDate(date: Date): boolean;
   }
}

Date.prototype.addDays = function (days: number) {
   if (!days) return this;
   let date = this;
   date.setDate(date.getDate() + days);
   return date;
};

Date.prototype.isToday = function (): boolean {
   let today = new Date();
   return this.isSameDate(today);
};

Date.prototype.clone = function(): Date {
   return new Date(+this);
};

Date.prototype.isAnotherMonth = function(date: Date): boolean {
   return date && this.getMonth() !== date.getMonth();
};

Date.prototype.isWeekend = function(): boolean {
   return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isSameDate = function (date: Date): boolean {
   return date && this.getFullYear() === date.getFullYear() && this.getMonth() === date.getMonth() && this.getDate() === date.getDate();
};

Date.prototype.getWeek = function () {
    const onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
}
  
// EOF