import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'aw-table',
  templateUrl: './table.component.html',
  standalone: true,
  imports: [NgClass, SpinnerComponent]
})
export class TableComponent<T> {
  @Input({ required: true }) apiResult: ApiResult<T> = new ApiResult<T>();
  @Input() tableResponsive = true;
  @Input() loading = false;
  @Input() tableCss = 'table-hover';
  @Input() showSpinnerLoading = true;
}
