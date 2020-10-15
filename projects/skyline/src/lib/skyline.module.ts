import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorService } from './service/color.service';
import { SkylineComponent } from './skyline.component';
import { SkylineService } from './skyline.service';


@NgModule({
  declarations: [SkylineComponent],
  providers: [
    ColorService,
    SkylineService,
  ],
  imports: [
    CommonModule
  ],
  exports: [SkylineComponent]
})
export class SkylineModule { }
