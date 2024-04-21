import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';
import { PageHeaderComponent } from '../../components/pages/page-header/page-header.component';
import { YearCalendarViewComponent } from '../../components/year-calendar-view/year-calendar-view.component';

@Component({
  selector: 'aw-tests',
  standalone: true,
  templateUrl: './tests.component.html',
  styleUrl: './tests.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatDatepickerModule,
    PageBaseComponent,
    PageHeaderComponent,
    YearCalendarViewComponent
  ]
})
export class TestsComponent {
  selected = DateTime.local(217, 3, 2).year;
}
