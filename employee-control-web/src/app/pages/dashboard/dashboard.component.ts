import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { PageBaseComponent } from '../../components/pages/page-base/page-base.component';

@Component({
  selector: 'aw-dashboard',
  standalone: true,
  imports: [PageBaseComponent, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
