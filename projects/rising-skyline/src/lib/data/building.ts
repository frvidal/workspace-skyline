export class Building {

    constructor(
        public id: number,
        public year: number,
        public week: number,
        public width: number,
        public height: number,
        public index: number,
        public title: string) {}

    public clone(): Building {
        return new Building(this.id, this.year, this.week, this.width, this.height, this.index, this.title);
    }

    /**
     * Zoom this level to the given level.
     * @param level the level of zoom
     */
    public zoom(level: number): void {
        this.height = this.height * level;
        this.width = this.width * level;
    }
}
