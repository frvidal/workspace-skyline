export class Building {

    constructor(
        public id: number,
        public year: number,
        public week: number,
        public width: number,
        public height: number,
        public index: number) {}

    /**
     * Zoom this level to the given level.
     * @param level the level of zoom
     */
    public zoom(level: number) {
        this.height = this.height * level;
        this.width = this.width * level;
    }
}
