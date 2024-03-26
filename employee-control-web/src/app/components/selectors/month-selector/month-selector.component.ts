import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { CalendarCellViewModel } from 'ngx-bootstrap/datepicker/models';
import { LocalizationService, LocalizationUtils } from '../../../core/features/localizations/_index';

@Component({
  selector: 'aw-month-selector',
  templateUrl: './month-selector.component.html',
  standalone: true,
  imports: [BsDatepickerModule, FormsModule]
})
export class MonthSelectorComponent {
  private readonly bsLocaleService = inject(BsLocaleService);
  private readonly localizationService = inject(LocalizationService);

  @Input() dateSelected = new Date();

  @Output() changeMonthSelected = new EventEmitter<Date>();

  bsConfig: Partial<BsDatepickerConfig>;

  constructor() {
    // Locale BsDatepicker.
    const localeNgxBootstrap = LocalizationUtils.mapLocaleToNgxBootstrap(this.localizationService.getLocaleValue());
    this.bsLocaleService.use(localeNgxBootstrap);

    // Default BsDatepickerConfig.
    this.bsConfig = {
      containerClass: 'theme-default',
      dateInputFormat: 'MMMM YYYY',
      showTodayButton: true,
      todayButtonLabel: 'Mes actual',
      adaptivePosition: true
    };
  }

  // No se que tipo es container.
  // eslint-disable-next-line
  handleOpenCalendar(container: any): void {
    container.monthSelectHandler = (event: CalendarCellViewModel): void => {
      container._store.dispatch(container._actions.select(event.date));
    };

    container.setViewMode('month');
  }

  handleChange(date: Date): void {
    this.changeMonthSelected.emit(date);
  }
}
