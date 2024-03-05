import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationComponent } from './pagination.component';

@NgModule({
  imports: [CommonModule, FormsModule, TooltipModule.forRoot()],
  declarations: [PaginationComponent],
  exports: [PaginationComponent]
})
export class AwPaginationModule {}
