import { NgModule } from '@angular/core';
import { ColorService } from './service/color.service';
import { SkylineComponent } from './skyline.component';



@NgModule({
  declarations: [SkylineComponent],
  imports: [
    ColorService
  ],
  exports: [SkylineComponent]
})
export class SkylineModule { }
