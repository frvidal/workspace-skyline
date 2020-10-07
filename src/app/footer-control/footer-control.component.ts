import { Component, OnInit } from '@angular/core';
import { SkylineService } from 'projects/skyline/src/lib/skyline.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-footer-control',
  templateUrl: './footer-control.component.html',
  styleUrls: ['./footer-control.component.css']
})
export class FooterControlComponent implements OnInit {

  constructor(public skylineService: SkylineService) { }

  formatYearWeek = (value: number) => {
    return this.skylineService.currentYear + ' ' + this.skylineService.currentWeek;
  }

  ngOnInit(): void {
  }

}
