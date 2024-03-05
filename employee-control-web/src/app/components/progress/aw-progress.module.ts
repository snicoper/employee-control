import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { AwCardsModule } from '../cards/aw-cards.module';
import { AwSpinnerModule } from '../spinner/aw-spinner.module';
import { ProgressStackedComponent } from './progress-stacked/progress-stacked.component';
import { TimeControlProgressComponent } from './time-control-progress/time-control-progress.component';

@NgModule({
  declarations: [ProgressStackedComponent, TimeControlProgressComponent],
  imports: [CommonModule, AwDirectivesModule, AwCardsModule, AwSpinnerModule],
  exports: [ProgressStackedComponent, TimeControlProgressComponent]
})
export class AwProgressModule {}
