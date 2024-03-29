import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, using } from 'rxjs';
import { Building } from './data/building';
import { YearWeek } from './data/year-week';
import { Variation } from './variation';
import { SpeedVariation } from './speed-variation';

import './date.extension';


/**
 * The SkylineService is in charge of the animation of the skyline rising.
 */
@Injectable({
	providedIn: 'root'
})
export class RisingSkylineService {

	constructor(private datePipe: DatePipe) { }

	/**
	 * Default speed of the animation.
	 */
	private static DEFAULT_SPEED = 1000;

	/**
	 * Activate or Inactivate the **Debug** mode in this service.
	 */
	private DEBUG = false;

	/**
	 * Activate or Inactivate the **Verbose** mode in this service.
	 */
	private VERBOSE = false;

	/**
	 * Date when the first episode of the skyline rising _(the first building has been created)_.
	 */
	public firstDate: Date;

	/**
	 * Date when the last episode of the skyline rising _(the last building has been ended)_.
	 */
	public lastDate: Date;

	/**
	 * **BehaviorSubject** emitting the partial or complete history of the skyline rising.
	 */
	public history$ = new BehaviorSubject<Building[]>([]);

	/**
	 * **BehaviorSubject** emitting an episode of the rising skyline to be drawn
	 */
	public episode$ = new BehaviorSubject<Building[]>([]);

	/**
	 * The active episode of the rising skyline for the current year/week.
	 */
	public episode: Building[] = [];

	/**
	* For performance purpose :
	*
	* This array contains an ordered list of YearWeek object.
	* Its prime goal is to synchronize the slider position and the corresponding YearWeek location
	*/
	public yearWeeks: YearWeek[] = [];

	/**
	 * The complete history of the skyline : all floors by year/week are stored in this array.
	 */
	public history: Building[] = [];

	/**
	 * Identifier for the rising loop interval.
	 */
	// private intervalId: number;
	private timeout: NodeJS.Timeout;

	/**
	 * the Level of zoom.
	 */
	private levelOfZoom = 0.5;

	/**
	 * Current speed of the animation.
	 */
	private speed = RisingSkylineService.DEFAULT_SPEED;

	/**
	 * Variation of speed.
	 *
	 * This variation number increase, or decrease, the speed of the animation.
	 */
	public variation: Variation = SpeedVariation.first();

	/**
	 * Number of episodes _(floors)_ currently present in the history.
	 */
	public countEpisodes: number;

	/**
	 * Curent floor index currently handled in **riseSkyline**.
	 */
	public currentEpisode = 0;

	/**
	 * Curent year processed in **riseSkyline**.
	 */
	public currentYear = 0;

	/**
	 * Curent week processed in **riseSkyline**.
	 */
	public currentWeek = 0;

	/**
	 * This boolean is set to true when the animation is paused.
	 */
	public pause = false;

	/**
	 * Inject the speed of the animation, received by the component.
	 * @param speed the speed of the animation
	 */
	injectSpeed(speed: number): void {
		if (speed) {
			RisingSkylineService.DEFAULT_SPEED = speed;
			this.speed = RisingSkylineService.DEFAULT_SPEED;
		}
	}

	/**
	 * Start the rising animation from the first day in history.
	 */
	startSkylineRising(): void {
		this.currentYear = this.toYearWeek(this.firstDate).year;
		this.currentWeek = this.toYearWeek(this.firstDate).week;
		this.riseSkyline();
	}

	/**
	 * Produce the stupendous rising of skyline.
	 */
	riseSkyline(): void {

		const floor = (building: Building) => {
			return (building.year === this.currentYear) && (building.week === this.currentWeek);
		};

		this.timeout = setInterval( () => {
			// We add one floor in the animation.
			this.currentEpisode++;

			//
			// We filter & clone the subset of the history.
			// We'll probably change the scale of the building, and we don't want to override the original data
			//
			this.episode = [];
			this.history.filter(floor).forEach(building => this.episode.push(building.clone()));

			// We memorize the current year and week displayed.
			if (this.episode.length > 0) {
				this.currentYear = this.episode[0].year;
				this.currentWeek = this.episode[0].week;
				if ((this.DEBUG) && (this.VERBOSE)) {
					console.log ('Week', this.currentYear + '/' + this.currentWeek);
				}
			}

			this.zoom(this.episode);
			/*
			if (this.DEBUG) {
				console.log ('The skyline contains %d buildings for year %s & week %s', this.episode.length, this.currentYear, this.currentWeek);
			}
			*/

			const date = this.getDateOfWeek(this.currentYear, this.currentWeek);
			const dateNextWeek = date.addDays(7);
			if ((dateNextWeek > this.lastDate) || (this.pause)) {
				if (this.DEBUG) {
					console.log ('Rising ends at ' + this.toYearWeek(dateNextWeek).year + ' ' + this.toYearWeek(dateNextWeek).week);
				}
				setTimeout(() =>  clearInterval(this.timeout), 0);
				// We set to TRUE pause if we reached the end of the history (> lastDate).
				this.pause = true;
			} else {
				this.currentWeek = this.toYearWeek(dateNextWeek).week;
				this.currentYear = this.toYearWeek(dateNextWeek).year;
				this.episode$.next(this.episode);
			}
		}, this.speed);
	}

	/**
	 * Draw the given episode.
	 * @param episode the given epise
	 */
	public drawEpisode(episode: Building[]): void {
		if (this.DEBUG) {
			console.log ('The episode contains %d building', episode.length);
		}
		this.zoom(episode);
		this.episode$.next(episode);
	}

	/**
	 * Extract and return an episode of the skyline for a given week
	 * @param year the year of the week
	 * @param week the week
	 */
	extractSkylineEpisode(year: number, week: number): Building[] {
		const floor = (building: Building) => {
			return (building.year === year) && (building.week === week);
		};
		const skyline = [];
		this.history.filter(floor).forEach(building => skyline.push(building.clone()));
		return skyline;
	}

	/**
	 * Number of floors present in the history.
	 */
	numberOfFloors(): number {
		const floors = new Set(this.history.map(floor => floor.year * 100 + floor.week));
		if (this.DEBUG) {
			console.log ('History contains %d floors.', floors.size);
		}
		return floors.size;
	}

	/**
	 * Initiliaze the content of an array of __Year/Weeks__
	 *
	 * This array is synchronized with the position of the coin moving on the slider.
	 */
	initArrayYearWeeks(): void {
		const setYearWeeks = new Set(this.history.map(building => building.year * 100 + building.week));
		this.yearWeeks = [];
		setYearWeeks.forEach(item => this.yearWeeks.push(new YearWeek(Math.floor(item / 100), item % 100)));
		if (this.DEBUG) {
			console.groupCollapsed ('Array of year/weeks contains %d entries', this.yearWeeks.length);
			this.yearWeeks.forEach(yw => console.log (yw.toString()));
			console.groupEnd();
		}
	}

	/**
	 * Complete the skyline perspective by filling the holes.
	 */
	public fillTheHoles(): void {
		if (this.DEBUG) {
			console.log ('Entering fillTheHoles()');
		}

		//
		// The static width if all buildings obtained from the first element of the received collection.
		// We fill the holes with the same width than the received buildings
		// 
		const width = (this.history.length > 0) ? this.history[0].width : 0;

		const ids = [... new Set(this.history.map(building => building.id))];
		const buildings = this.history.sort((a, b) => {
			return (a.id * 100000 + a.year * 100 + a.week)  - (b.id * 100000 + b.year * 100 + b.week);
		});
		ids.forEach(id => {

			const firstFloor = this.history
				.filter(building => building.id === id)
				.reduce((eligibleBuilding, building) => {
					return ( (building.year * 100 + building.week) < (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
						building : eligibleBuilding;
			});
			const startDate = this.getDateOfWeek(firstFloor.year, firstFloor.week);

			const lastFloor = this.history
				.filter(building => building.id === id)
				.reduce((eligibleBuilding, building) => {
					return ( (building.year * 100 + building.week) > (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
						building : eligibleBuilding;
			});
			const lastDate = this.getDateOfWeek(lastFloor.year, lastFloor.week).addDays(7);

			for (const d = this.firstDate.clone(); d < startDate; d.addDays(7)) {
				this.history.push(new Building(id, this.toYearWeek(d).year, this.toYearWeek(d).week, width, 0, 0, firstFloor.title));
			}

			for (const d = lastDate.clone(); d <= this.lastDate; d.addDays(7, true)) {
				const b = new Building(id,
					this.toYearWeek(d).year,
					this.toYearWeek(d).week,
					width,
					lastFloor.height,
					lastFloor.index,
					lastFloor.title);
				this.history.push(b);
			}

		});
		this.history = this.history.sort((a, b) => {
			return (a.id * 100000 + a.year * 100 + a.week)  - (b.id * 100000 + b.year * 100 + b.week);
		});

		// The save the number of floors in the history.
		this.countEpisodes = this.numberOfFloors();
		this.initArrayYearWeeks();
		this.currentEpisode = 0;
	}

	/**
	 * Return the order history of skylines by id, year & week
	 * Sort in ascending order the history of skylines by id, year & week
	 */
	sortedHistory(): Building[] {
		return this.history.sort((a, b) => {
			return (a.id * 100000 + a.year * 100 + a.week)  - (b.id * 100000 + b.year * 100 + b.week);
		});
	}

	/**
	 * Zoom IN or OUT the skyline
	 * @param episode the skyline rising episode
	 */
	zoom(episode: Building[]): void {
		episode.forEach(building => building.zoom(this.levelOfZoom));
	}

	/**
	 * Zoom-in the chart.
	 */
	public zoomIn(): void {
		if (this.DEBUG) {
			console.log ('Zoom IN from %d', this.levelOfZoom);
		}
		this.levelOfZoom = this.levelOfZoom * 1.1;
		this.forceRedrawAfterZoomIfNecessary();
	}

	/**
	 * Zoom-out the chart.
	 */
	public zoomOut(): void {
		if (this.DEBUG) {
			console.log ('Zoom OUT to %d', this.levelOfZoom);
		}
		this.levelOfZoom = this.levelOfZoom / 1.1;
		this.forceRedrawAfterZoomIfNecessary();
	}

	/**
	 * Force the redraw of the episode if it's necessary.
	 */
	forceRedrawAfterZoomIfNecessary(): void {
		// The animation is paused. Therefore we force the redraw of the SAME episode.
		if ((this.pause) && (this.episode.length > 0)) {
			const b = this.episode[0];
			const episode = this.extractSkylineEpisode(b.year, b.week);
			this.drawEpisode(episode);
		}
	}

	/**
	 * Take in account the full history of the skyline.
	 * @param history the history received by the component.
	 */
	public takeInAccount(history: Building[]): void {
		this.history = history;
		const firstBuilding = this.history.reduce((eligibleBuilding, building) => {
			return ( (building.year * 100 + building.week) < (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
				building : eligibleBuilding;

		});
		const lastBuilding = this.history.reduce((eligibleBuilding, building) => {
			return ( (building.year * 100 + building.week) > (eligibleBuilding.year * 100 + eligibleBuilding.week) ) ?
				building : eligibleBuilding;

		});
		if (this.DEBUG) {
			console.log ('FIRST Building has been placed on week %d year %d', firstBuilding.week, firstBuilding.year);
			console.log ('LAST Building has been placed on week %d year %d', lastBuilding.week, lastBuilding.year);
		}
		this.firstDate = this.getDateOfWeek(firstBuilding.year, firstBuilding.week);
		this.lastDate = this.getDateOfWeek(lastBuilding.year, lastBuilding.week);
	}


	/**
	 * Return the date of the first week day : a **MONDAY** in this implementation.
	 *
	 * **Should you use later :** const todayFormated = this.datepipe.transform(today, 'w');.
	 *
	 * @param year the year of the date
	 * @param week the week the week of the date
	 */
	public getDateOfWeek(year: number, week: number): Date {
		// The week number 1 of a year, has to contain the first civil thursday of this year.
		const firstWeekOffset =  (new Date(year, 0, 1).getDay() <= 4) ? 0 : 1;

		const date = new Date(year, 0, (1 + (firstWeekOffset + week - 1) * 7));
		date.setDate(date.getDate() + (1 - date.getDay())); // 0 - Sunday, 1 - Monday etc
		return date;
	}

	/**
	 * Return the couple year/week corresponding to the given date.
	 * @param date the given date
	 */
	public toYearWeek(date: Date): YearWeek {

		const week =  Number(this.datePipe.transform(date, 'w'));
/*
		// This is a bug from datePipe, and this is a possible turnaround
		// https://github.com/angular/angular/issues/33961
		if (week === 53) {
			const day = date.getDay();

			//
			// The turnaround :
			//  If the thursday on the same week as the given date is new year,
			//  then we are exactly in the case of the bug, and we return '1' instead of '53'
			//
			if (day < 4) {
				const d = date.clone().addDays(4 - date.getDay(), false);
				if (d.getFullYear() > date.getFullYear()) {
					return new YearWeek(d.getFullYear(), 1);
				}
			}
		}
*/
		return ( (date.getMonth() === 11) && (week === 1) ) ?
			new YearWeek(date.getFullYear() + 1, 1) : 
			new YearWeek(date.getFullYear(), week); 
	}

	/**
	 * Pause the skyline rising
	 */
	public pauseRising(): void {
		if (this.DEBUG) {
			console.log ('Rising is paused');
		}
		this.pause = true;
	}

	/**
	 * Re-play the skyline rising from when it has been paused.
	 */
	public playRising(): void {
		if (this.DEBUG) {
			console.log ('Rising is restarted...');
		}
		this.pause = false;
		this.riseSkyline();
	}

	/**
	 * Rotate the variation of the animation speed.
	 *
	 * There are 5 levels : __1/4__, __1/2__, __1__, __2__, __4__.
	 */
	public rotateVariation(): void {
		this.variation = SpeedVariation.next(this.variation);
		this.speed = RisingSkylineService.DEFAULT_SPEED / this.variation.acceleration;
		if (this.DEBUG) {
			console.log ('New variation %s produces the speed %d', this.variation.title, this.speed);
		}
		clearInterval(this.timeout);
		this.riseSkyline();
	}

	/**
	 * Return the actual speed of the animation.
	 */
	public getSpeed(): number {
		return this.speed;
	}
}
