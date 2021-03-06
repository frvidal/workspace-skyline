import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {Building} from './data/building';
import {ColorService} from './service/color.service';
import {RisingSkylineService} from './rising-skyline.service';
import { take } from 'rxjs/operators';
import { BuildingSelected } from './data/building-selected';

@Component({
	selector: 'rising-skyline',
	templateUrl: './rising-skyline.component.html',
	styleUrls: ['./rising-skyline.component.css']
})
export class SkylineComponent implements OnInit, OnDestroy, AfterViewInit {

	/**
	 * The width of the container, with its units of mesure (px, %, em...).
	 */
	@HostBinding('style.--container-width')
	@Input() width: string;

	/**
	 * The height of the container with the unit of mesure such as ('px', 'em', '%')
	 */
	@HostBinding('style.--container-height')
	@Input() height: string;

	/**
	 * The margin of the container with the unit of mesure such as ('px', 'em', '%')
	 */
	@HostBinding('style.--container-margin')
	@Input() margin: string;

	/**
	 * This observable emits the complete story of the rising skyline.
	 *
	 * This reveived array will be completed and passed to the __SkylineService__.
	 */
	@Input() risingSkylineHistory$;

	/**
	 * Animation speed in milliseconds
	 */
	@Input() speed;

	/**
	 * The starting color
	 *
	 * The building is drawn between 2 colors : This color is the starting one.
	 */
	@Input() startingColor: string;

	/**
	 * The ending color
	 * The building is drawn between 2 colors : This color is the ending one.
	 */
	 @Input() endingColor: string;

	/**
	 * The font to use for the vertical title
	 */
	@HostBinding('style.--font')
	@Input() font: string;

	/**
	 * Always display the vertical title on top of each building.
	 * 
	 * Default value is **false**.
	 */
	@Input() displayVerticalTitle = false;

	/**
	 * Display the vertical title when the building height reaches this value.
	 * 
	 * Default value is **10**.
	 */
	@Input() buildingMinimumHeightVerticalTitle = 10;

	/**
	 * This messenger wil inform the parent container that the user has clicked a building.
	 */
	@Output() onClickBuilding = new EventEmitter<BuildingSelected>();

	/**
	 * This messenger will inform the parent container that the user is entering on a building.
	 */
	@Output() onEnterBuilding = new EventEmitter<BuildingSelected>();

	/**
	 * This messenger wil inform the parent container that the user is entering on a building.
	 */
	@Output() onLeaveBuilding = new EventEmitter<BuildingSelected>();
	 
	/**
	 * Component is setup in DEBUG mode
	 */
	private DEBUG = false;

	/**
	 * Computed heighted in __px__.
	 * This number is used to locate verticaly the buildings inside the container.
	 * If the given unit of measure for height is not 'px', but '%' for example, then we need to compute this height.
	 */
	private computedHeightInPx = 0;

	/**
	 * Building hightlighted by the mouse
	 */
	private buildingSelected = null;

	/**
	 * The subscription reading the flow of episodes in the animation.
	 */
	private subscription: Subscription;

	constructor(
		private colorService: ColorService,
		public skylineService: RisingSkylineService) {
	}

	ngOnInit(): void {
		if (this.DEBUG) {
			console.log ('Colors start from %s to %s', this.startingColor, this.endingColor);
		}
		this.colorService.initBoundaryColors(this.startingColor, this.endingColor);

		this.subscription = this.risingSkylineHistory$.subscribe({
			next: buildings => {
				if (buildings.length !== 0) {
					this.skylineService.injectSpeed(this.speed);
					this.skylineService.takeInAccount(buildings);
					this.skylineService.fillTheHoles();

					this.skylineService.startSkylineRising();
				}
			}
		});

	}

	/**
	 * After viw processing.
	 */
	ngAfterViewInit(): void {
		const htmlContainer = document.getElementsByClassName('container-fluid').item(0);
		if (htmlContainer) {
			this.computedHeightInPx = htmlContainer.clientHeight;
			if (this.DEBUG) {
				console.log ('Computed heigth', this.computedHeightInPx);
			}
		} else {
			console.error('INTERNAL ERROR : Cannot retrieve the div container');
		}
	}

	/**
	 * Mouse is entering the building.
	 */
	public mouseEnterBuilding(event: MouseEvent, building: Building): void {
		this.buildingSelected = building;
		this.onEnterBuilding.emit(new BuildingSelected(building, event));
	}
	
	/**
	 * Mouse is leaving the building.
	 */
	public mouseLeaveBuilding(event: MouseEvent, building: Building): void {
		this.buildingSelected = null;
		this.onLeaveBuilding.emit(new BuildingSelected(building, event));
	}

	/**
	 * Mouse is clicking the building.
	 */
	public mouseClickBuilding(event: MouseEvent, building: Building): void {
		this.onClickBuilding.emit(new BuildingSelected(building, event));
	}

	/**
	 * Return the style of the bulding, based on this floor.
	 * @param building the given building
	 */
	styleBuilding(building: Building): string {
		// The separation between each building
		const MARGIN = 3;
		const width = building.width;
		const height = building.height;
		const color = this.color(building.index);
		const left = building.id * MARGIN;
		const top = this.computedHeightInPx - building.height;
	
		const style =
			`
			width: ${width}px; 
			height: ${height}px;
			background-color: ${color};
			position: relative; 
			top: ${top}px; 
			left: ${left}px;
			`

		return style;
	}

	/**
	 * Return the style of the title located on the roof top of the building.
	 * @param building the given building
	 */
	styleTitle(building: Building): string {
		// The separation between each building
		const MARGIN = 3;
		const width = building.width;
		const height = 200;
		const left = 0;
		const top = -height;
		const color = this.color(building.index);
		const style =
			`
			width: ${width}px; 
			height: ${height}px;
			
			background-color: transparent;
			border: 1;
			border-color: whiteSmoke;
			border-style: none; 
			color: ${color};

			position: relative; 
			top: ${top}px;
			left: ${left}px;
			`
		return style;
	}

	/**
	 * Each DIV is drawn in a color corresponding to a level in a range of colors.
	 * @param level the level of the measure
	 */
	color(level: number): string {
		return '#' + this.colorService.red(level) + this.colorService.green(level) + this.colorService.blue(level);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

}
