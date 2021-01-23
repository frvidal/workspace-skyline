import { Component } from '@angular/core';
import { ControlledRisingSkylineService } from 'controlled-rising-skyline';
import { Building, RisingSkylineService } from 'rising-skyline';
import { BehaviorSubject } from 'rxjs';
import dataOfSingleProject from './json_files/rising-skyline-data-of-single-project.json';
import dataProd from './json_files/prod.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	/**
	 * This observable emits a testing generated array of building.
	 */
	public skyline$ = new BehaviorSubject<Building[]>([]);
	
	private RANDOM = false;

	private PROD = !this.RANDOM;

	public skyline = [];
	
	public constructor(
		public controlledSkylineService: ControlledRisingSkylineService,
		public skylineService: RisingSkylineService) {

		if (this.RANDOM) {
			this.controlledSkylineService.randomSkylineHistory(this.skyline$);
		} else {
			// Using data of production
			if (this.PROD) {
				console.log("Using data of production");
				const data: Building[] = [];
				dataProd.forEach(item => {
					data.push(new Building(
						item.id,
						item.year,
						item.week,
						item.width,
						item.height,
						item.index,
						item.title));
				});
				this.skyline$.next(data);

			} else {
				// Testing a build single project
				dataOfSingleProject.forEach(b => {
					this.skyline.push(new Building(b.id, b.year, b.week, b.week, b.height, b.index, b.title));
				});
				this.skyline$.next(this.skyline);
			}
		}
		this.skyline$.subscribe({
			next: skyline => {
				console.groupCollapsed('in Subscribe');
				console.table(skyline);
				console.groupEnd();
			}
		});
	}
}
