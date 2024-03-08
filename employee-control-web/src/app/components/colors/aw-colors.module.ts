import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DotDangerComponent } from './dot-danger/dot-danger.component';
import { DotSuccessComponent } from './dot-success/dot-success.component';
import { DotComponent } from './dot/dot.component';
import { DotWarningComponent } from './dot-warning/dot-warning.component';
import { DotInfoComponent } from './dot-info/dot-info.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DotComponent, DotSuccessComponent, DotDangerComponent, DotWarningComponent, DotInfoComponent],
  exports: [DotComponent, DotSuccessComponent, DotDangerComponent]
})
export class AwColorsModule {}
