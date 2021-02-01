import { AfterViewInit, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Building, BuildingSelected, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
	selector: 'controlled-rising-skyline',
	templateUrl: './controlled-rising-skyline.html',
	styleUrls: ['./controlled-rising-skyline.css']
})
export class ControlledRisingSkylineComponent implements OnInit, AfterViewInit, OnDestroy {

	/**
	 * The width of the container, with its units of mesure (px, %, em...).
	 * Defaut value is __'600px'__;
	 */
	@Input()
	@HostBinding('style.--mainDiv-width')
	public width = '600px';

	/**
	 * The height of the container, with its units of mesure (px, %, em...).
	 * Defaut value is _'400px'_;
	 */
	@Input()
	@HostBinding('style.--mainDiv-height')
	public height = '400px';

	/**
	 * The margin around the container.
	 * Defaut value is _'10px'_;
	 */
	@Input()
	public margin = '10px';

	/**
	/**
	 * The width of each building on the skyline without the unit of measure.
	 * Defaut value is __40__;
	 */
	@Input()
	public buildingWidth = 40;

	/**
	 * This behaviorSubject emits the complete story of the rising skyline.
	 *
	 * This reveived array will be passed to the __SkylineService__.
	 */
	@Input()
	public risingSkylineHistory$ = new BehaviorSubject<Building[]>([]);

	/**
	 * Starting speed of the animation in ms.
	 * Default value is _30_
	 */
	@Input()
	public speed = 30;

	/**
	 * __Starting__ color of the color gradation.
	 * Default value is _ping_
	 */
	@Input()
	public startingColor = 'red';

	/**
	 *  __Ending__ color of the color gradation.
	 * Default value is _blue_
	 */
	@Input()
	public endingColor = 'green';

	/**
	 * Always display the vertical title on top of each building.
	 * 
	 * Default value is **false**.
	 */
	@Input() displayVerticalTitle = false;

	/**
	 * The font to use for the vertical title
	 */
	@Input() font: string;

	/**
	 * Color of the skyline container
	 */
	@HostBinding('style.--skyline-background-color')
	@Input() skylineBackgroundColor = 'transparent';

	/**
	 * Color of the skyline control panel
	 */
	@Input() controlBackgroundColor = 'lightGrey';

	/**
	 *  __Slider__ color.
	 * Default value is _violet_
	 */
	@Input()
	public sliderColor = 'violet';

	/**
	 *  (_Internal_) debug mode.
	 * Default value is **false**
	 */
	@Input()
	public debug = false;

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
	 * The number of floors _(or episodes)_ involved in the skyline, starting from skyline.startDate to skyline.lastDate
	 */
	public numberOfFloors;

	/**
	 * The current position of floor _(or episode)_ being drawn.
	 */
	public positionOfFloor = 0;

	/**
	 * The subscription on the skyline rising.
	 */
	private subscriptionSkyline: Subscription;

	constructor(public skylineService: RisingSkylineService) {
	}


	ngOnInit(): void {
		if (this.debug) {
			console.log('Skyline w ' + this.width + ', h ' + this.height);
		}

		this.subscriptionSkyline = this.skylineService.episode$
			.subscribe({
				next: floors => this.positionOfFloor++
			});
	}


	/**
	 * After view initialization : Here, we set the width of the container.
	 */
	ngAfterViewInit(): void {
		const mainDiv = document.getElementById('mainDiv');
		if (mainDiv) {
			mainDiv.setAttribute('style', 'width:' + this.width + 'px;height:' + this.height + 'px');
			if (this.debug) {
				console.log(mainDiv.getAttribute('style'));
			}
		} else {
			console.error('INTERNAL ERROR : Did not retrieve the main div');
		}
	}
	
	/**
	 * Mouse is entering the building.
	 */
	public mouseEnterBuilding($event: BuildingSelected): void {
		this.onEnterBuilding.emit($event);
	}

	/**
	 * Mouse is leaving the building.
	 */
	public mouseLeaveBuilding($event: BuildingSelected): void {
		this.onLeaveBuilding.emit($event);
	}

	/**
	 * Mouse is clicking the building.
	 */
	public mouseClickBuilding($event: BuildingSelected): void {
		this.onClickBuilding.emit($event);
	}


	ngOnDestroy(): void {
		this.subscriptionSkyline.unsubscribe();
	}
}
