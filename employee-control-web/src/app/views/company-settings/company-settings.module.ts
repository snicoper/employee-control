import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AwButtonsModule } from '@aw/components/buttons/aw-buttons.module';
import { AwCardsModule } from '@aw/components/cards/aw-cards.module';
import { AwFormsModule } from '@aw/components/forms/aw-forms.module';
import { AwSpinnerModule } from '@aw/components/spinner/aw-spinner.module';
import { AwTablesModule } from '@aw/components/tables/aw-tables.module';
import { AwTooltipsModule } from '@aw/components/tooltips/aw-tooltips.module';
import { AwViewsModule } from '@aw/components/views/aw-views.module';
import { CompanySettingsDetailsComponent } from './company-settings-details/company-settings-details.component';
import { CompanySettingsEditComponent } from './company-settings-edit/company-settings-edit.component';
import { CompanySettingsRoutingModule } from './company-settings-routing.module';

@NgModule({
  declarations: [CompanySettingsDetailsComponent, CompanySettingsEditComponent],
  imports: [
    CommonModule,
    CompanySettingsRoutingModule,
    ReactiveFormsModule,
    AwViewsModule,
    AwCardsModule,
    AwSpinnerModule,
    AwTooltipsModule,
    AwFormsModule,
    AwButtonsModule,
    AwTablesModule
  ]
})
export class CompanySettingsModule {}
