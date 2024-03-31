import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { LocalizationUtils } from '../../../core/features/localizations/localization-utils';
import { LocalizationService } from '../../../core/features/localizations/localization.service';

@Component({
  selector: 'aw-date-range-selector',
  standalone: true,
  imports: [FormsModule, NgClass, BsDatepickerModule],
  templateUrl: './date-range-selector.component.html',
  styleUrl: './date-range-selector.component.scss'
})
export class DateRangeSelectorComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input() enableClickIcon = true;
  @Input() rangeValue = [new Date(), new Date()];
  @Input() maxDate = new Date();
  @Input() isDisabled = false;
  @Input() bsConfig: Partial<BsDatepickerConfig>;

  @Output() dateRangeValueChange = new EventEmitter<(Date | undefined)[] | undefined>();
  @Output() clickIcon = new EventEmitter<void>();

  /** Evitar el primer emit en handleChangeValue().  */
  private firstChange = true;

  constructor() {
    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'LL',
      adaptivePosition: true,
      selectWeekDateRange: true
    };
  }

  handleChangeValue(value: (Date | undefined)[] | undefined): void {
    if (this.firstChange) {
      this.firstChange = false;
    } else {
      this.dateRangeValueChange.emit(value);
    }
  }

  handleClickIcon(): void {
    this.clickIcon.emit();
  }
}
