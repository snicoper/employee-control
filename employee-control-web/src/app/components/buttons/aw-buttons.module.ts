import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { BtnBackComponent } from './btn-back/btn-back.component';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';

@NgModule({
  imports: [CommonModule, RouterModule, AwSpinnerModule],
  declarations: [BtnLoadingComponent, BtnBackComponent],
  exports: [BtnLoadingComponent, BtnBackComponent]
})
export class AwButtonsModule {}
