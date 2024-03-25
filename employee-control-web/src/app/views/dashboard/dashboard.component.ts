import { Component } from '@angular/core';
import { ViewBaseComponent } from '../../components/views/view-base/view-base.component';

@Component({
  selector: 'aw-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: true,
  imports: [ViewBaseComponent]
})
export class DashboardComponent {}
