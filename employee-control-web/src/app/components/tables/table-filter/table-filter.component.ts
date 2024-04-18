import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiResult } from '../../../core/features/api-result/api-result';
import { LogicalOperator } from '../../../core/features/api-result/types/logical-operator';
import { RelationalOperator } from '../../../core/features/api-result/types/relational-operator';

@Component({
  selector: 'aw-table-filter',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIcon, MatInputModule],
  templateUrl: './table-filter.component.html'
})
export class TableFilterComponent<T> {
  apiResult = input.required<ApiResult<T>>();
  fieldsFilter = input.required<Array<string>>();

  filterChange = output<ApiResult<T>>();

  term = '';

  handleFilterChange(event: Event): void {
    this.apiResult().cleanFilters();
    this.term = String(event);

    // Las búsquedas siempre lo hace desde la pagina 1.
    if (this.term.length > 0) {
      this.apiResult().pageNumber = 1;
    }

    this.fieldsFilter().forEach((element: string) => {
      const logicalOperator = this.apiResult().filters.length === 0 ? LogicalOperator.None : LogicalOperator.Or;
      this.apiResult().addFilter(element, RelationalOperator.Contains, this.term, logicalOperator);
    });

    this.filterChange.emit(this.apiResult());
  }
}
