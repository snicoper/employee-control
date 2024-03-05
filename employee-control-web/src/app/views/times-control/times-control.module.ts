import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwColorsModule } from '@aw/components/colors/aw-colors.module';
import { AwProgressModule } from '@aw/components/progress/aw-progress.module';
import { AwSelectorsModule } from '@aw/components/selectors/aw-selectors.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { AwPipesModule } from '@aw/pipes/pipes.module';
import { TimesControlRoutingModule } from './times-control-routing.module';
import { TimesControlComponent } from './times-control.component';

@NgModule({
  declarations: [TimesControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    TimesControlRoutingModule,
    AwViewsModule,
    AwCardsModule,
    AwProgressModule,
    AwButtonsModule,
    AwSpinnerModule,
    AwSelectorsModule,
    AwColorsModule,
    AwPipesModule
  ]
})
export class TimesControlModule {}
