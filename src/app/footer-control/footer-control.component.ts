import { Component, OnInit } from '@angular/core';
import { SkylineService } from 'projects/skyline/src/lib/skyline.service';

@Component({
  selector: 'app-footer-control',
  templateUrl: './footer-control.component.html',
  styleUrls: ['./footer-control.component.css']
})
export class FooterControlComponent implements OnInit {

  constructor(public skylineService: SkylineService) { }

  ngOnInit(): void {
  }

}
