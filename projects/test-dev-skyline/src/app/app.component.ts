import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Building } from '../../../rising-skyline/src/lib/data/building';
import { RisingSkylineService } from '../../../rising-skyline/src/lib/rising-skyline.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import './date.extension';
import { BuildingSelected } from 'projects/rising-skyline/src/lib/data/building-selected';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy  {
	
	public skyline$ = new BehaviorSubject<Building[]>([]);
	
	private DEBUG = true;

	/**
	 * The margin of the container
	 */
	public margin = '10px';

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

	/**
	 * The building activated, or clicked, by the end-user.
	 */
	public building;

	private WIDTH_BUILDING = 80;

	constructor(
		public datePipe: DatePipe, 
		public skylineService: RisingSkylineService) {
		
		const upperYear = 2020;
		const upperWeek = 45;

		function randomInteger(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function addDays(theDate, days) {
			return new Date(theDate.getTime() + days*24*60*60*1000);
	}
		
		const buildings: Building[] = []
		for (let id = 0; id < 100; id++) {
			
			// The building starts to rise on this date
			const startDate =new Date(randomInteger(2017, 2018), randomInteger(1,12), randomInteger(1, 27))

			// The building ends its rising on this date
			const endDate = new Date(randomInteger(2019, 2020), randomInteger(1,12), randomInteger(1, 27))
			if (this.DEBUG) {
				console.groupCollapsed ('Project starts from %s (week %s) to %s (week %s) for id %d',
					this.datePipe.transform(startDate, 'yyyy/MM/dd'), 
					this.datePipe.transform(startDate, 'w'), 
					this.datePipe.transform(endDate, 'yyyy/MM/dd'), 
					this.datePipe.transform(endDate, 'w'), 
					id);
				for (let d = startDate.clone(); d < endDate; d.addDays(7)) {
					console.log (this.datePipe.transform(d, 'yyyy-MM-dd') + ' ' + this.skylineService.toYearWeek(d).year + ' ' + this.skylineService.toYearWeek(d).week);
				}
				console.groupEnd();
			}
		 
			for (let d = startDate.clone(), stepHeight = 1; d <= endDate; d.addDays(7), stepHeight++) {
				buildings.push(new Building(id, this.skylineService.toYearWeek(d).year, this.skylineService.toYearWeek(d).week, this.WIDTH_BUILDING, stepHeight*2, randomInteger(0, 100), 'Building ' + id));
			}

		}
		this.skyline$.next(buildings);
	}
	
	ngOnInit(): void {
		this.subscriptionSkyline = this.skylineService.episode$.subscribe(floors => {
			this.positionOfFloor++;
		});
	}

	ngOnDestroy(): void {
		this.subscriptionSkyline.unsubscribe();
	}

	public onClickBuilding(buildingSelected: BuildingSelected) {
		console.log('Click on ' + buildingSelected.building.title);
	}

	public onEnterBuilding(buildingSelected: BuildingSelected) {
		console.log('Entering in ' + buildingSelected.building.title);
	}

	public onLeaveBuilding(buildingSelected: BuildingSelected) {
		console.log('Leaving ' + buildingSelected.building.title);
	}
}
