import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MonthSelectorComponent } from './month-selector/month-selector.component';

@NgModule({
  declarations: [MonthSelectorComponent],
  imports: [CommonModule, FormsModule, NgSelectModule, BsDatepickerModule.forRoot()],
  exports: [MonthSelectorComponent]
})
export class AwSelectorsModule {}