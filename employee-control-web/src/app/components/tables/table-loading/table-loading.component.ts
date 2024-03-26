import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'aw-table-loading',
  templateUrl: './table-loading.component.html',
  standalone: true,
  imports: [SpinnerComponent]
})
export class TableLoadingComponent {
  @Input({ required: true }) loading = false;
}
