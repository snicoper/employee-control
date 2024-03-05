import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { TooltipInfoComponent } from './tooltip-info/tooltip-info.component';

@NgModule({
  declarations: [TooltipInfoComponent],
  imports: [CommonModule, AwDirectivesModule],
  exports: [TooltipInfoComponent]
})
export class AwTooltipsModule {}
