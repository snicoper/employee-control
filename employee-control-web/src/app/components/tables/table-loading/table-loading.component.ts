import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-table-loading',
  templateUrl: './table-loading.component.html'
})
export class TableLoadingComponent {
  @Input({ required: true }) loading = false;
}
