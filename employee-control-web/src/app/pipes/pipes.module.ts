import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoolToIconPipe } from './bool-to-icon.pipe';
import { ClosedByPipe } from './closed-by.pipe';
import { DatetimeFormatPipe } from './datetime-format.pipe';
import { DatetimePipe } from './datetime.pipe';
import { DeviceTypePipe } from './device-type.pipe';
import { DurationToTimePipe } from './duration-to-time.pipe';
import { FormatSizeUnitPipe } from './format-size-unit.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

@NgModule({
  declarations: [
    FormatSizeUnitPipe,
    TruncateTextPipe,
    BoolToIconPipe,
    DatetimePipe,
    DatetimeFormatPipe,
    ClosedByPipe,
    DurationToTimePipe,
    DeviceTypePipe
  ],
  exports: [
    FormatSizeUnitPipe,
    TruncateTextPipe,
    BoolToIconPipe,
    DatetimePipe,
    DatetimeFormatPipe,
    ClosedByPipe,
    DurationToTimePipe,
    DeviceTypePipe
  ],
  imports: [CommonModule]
})
export class AwPipesModule {}
