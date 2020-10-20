import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorService } from './service/color.service';
import { SkylineComponent } from './rising-skyline.component';
import { RisingSkylineService } from './rising-skyline.service';


@NgModule({
  declarations: [SkylineComponent],
  providers: [
    ColorService,
    RisingSkylineService,
    DatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [SkylineComponent, DatePipe]
})
export class RisingSkylineModule { }
