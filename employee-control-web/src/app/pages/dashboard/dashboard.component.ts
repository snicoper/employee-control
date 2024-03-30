import { Component } from '@angular/core';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';

@Component({
  selector: 'aw-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [PageBaseComponent]
})
export class DashboardComponent {}
