import { Component } from '@angular/core';
import { WorkDaysComponent } from './work-days/work-days.component';
import { CompanyHolidaysComponent } from './company-holidays/company-holidays.component';
import { CardComponent } from '../../components/cards/card/card.component';
import { ViewHeaderComponent } from '../../components/views/view-header/view-header.component';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-manage-holidays',
    templateUrl: './manage-holidays.component.html',
    standalone: true,
    imports: [ViewBaseComponent, ViewHeaderComponent, CardComponent, CompanyHolidaysComponent, WorkDaysComponent]
})
export class ManageHolidaysComponent {}
