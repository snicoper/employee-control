import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '@aw/components/badges/badge/badge.component';

@NgModule({
  declarations: [BadgeComponent],
  imports: [CommonModule],
  exports: [BadgeComponent]
})
export class AwBadgesModule {}
