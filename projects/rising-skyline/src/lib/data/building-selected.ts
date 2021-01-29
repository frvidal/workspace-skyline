import { Building } from "./building";

/**
 * Class hosting a selected building.
 * 
 * This class is used by the mouse Event messenger 
 */
export class BuildingSelected {
    constructor(
        public building: Building,
        public event: MouseEvent
    ) {}
}