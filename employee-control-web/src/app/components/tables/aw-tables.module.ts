import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableInputSearchComponent } from './table-input-search/table-input-search.component';
import { TableLoadingComponent } from './table-loading/table-loading.component';
import { TableComponent } from './table/table.component';

@NgModule({
  imports: [CommonModule, FormsModule, AwSpinnerModule],
  declarations: [TableComponent, TableHeaderComponent, TableInputSearchComponent, TableLoadingComponent],
  exports: [TableComponent, TableHeaderComponent, TableInputSearchComponent, TableLoadingComponent]
})
export class AwTablesModule {}
