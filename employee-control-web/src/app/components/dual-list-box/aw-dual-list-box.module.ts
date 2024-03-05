import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AwSpinnerModule } from '../spinner/aw-spinner.module';
import { DualListBoxComponent } from './dual-list-box.component';

@NgModule({
  declarations: [DualListBoxComponent],
  imports: [CommonModule, FormsModule, AwSpinnerModule],
  exports: [DualListBoxComponent]
})
export class AwDualListBoxModule {}
