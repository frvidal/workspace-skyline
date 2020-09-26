import { Component, OnInit } from '@angular/core';
import { Building } from 'projects/skyline/src/lib/data/building';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  public skyline$ = new BehaviorSubject<Building[]>([]);
  
  constructor() {
    const buildings: Building[] = []
    for (let i = 0; i < 20; i++) {
      buildings.push(new Building(i, 40, 20 + (i%5)*30, i*5));
    }
    this.skyline$.next(buildings);
  }

}
