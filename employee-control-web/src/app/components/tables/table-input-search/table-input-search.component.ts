import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { LogicalOperators } from '../../../core/features/api-result/types/logical-operator';
import { RelationalOperators } from '../../../core/features/api-result/types/relational-operator';
import { TableHeaderField } from '../table-header/table-header-field.interface';
import { TableHeaderConfig } from '../table-header/table-header.config';

@Component({
  selector: 'aw-table-input-search',
  templateUrl: './table-input-search.component.html',
  standalone: true,
  imports: [FormsModule]
})
export class TableInputSearchComponent<T> {
  @Input({ required: true }) tableHeaderConfig = new TableHeaderConfig();
  @Input({ required: true }) apiResult = new ApiResult<T>();

  @Output() clickClean = new EventEmitter<ApiResult<T>>();

  term = '';

  handleInputChange(event: Event): void {
    this.apiResult = ApiResult.clone(this.apiResult);
    this.apiResult.cleanFilters();
    this.term = String(event);

    // Las búsquedas siempre lo hace desde la pagina 1.
    if (this.term.length > 0) {
      this.apiResult.pageNumber = 1;
    }

    this.tableHeaderConfig.headers.forEach((element: TableHeaderField) => {
      if (element.filterable) {
        const logicalOperator = this.apiResult.filters.length === 0 ? LogicalOperators.none : LogicalOperators.or;
        this.apiResult.addFilter(element.field, RelationalOperators.contains, this.term, logicalOperator);
      }
    });

    this.clickClean.emit(this.apiResult);
  }
}
