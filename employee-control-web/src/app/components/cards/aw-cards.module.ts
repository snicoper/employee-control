import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { CardComponent } from './card/card.component';

@NgModule({
  imports: [CommonModule, AwSpinnerModule],
  declarations: [CardComponent],
  exports: [CardComponent]
})
export class AwCardsModule {}
