import { NgModule } from '@angular/core';
import { ColorService } from './service/color.service';
import { SkylineComponent } from './skyline.component';
import { SkylineService } from './skyline.service';



@NgModule({
  declarations: [SkylineComponent],
  imports: [
    ColorService,
    SkylineService,
  ],
  exports: [SkylineComponent]
})
export class SkylineModule { }
