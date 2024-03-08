import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-tooltip-info',
  templateUrl: './tooltip-info.component.html'
})
export class TooltipInfoComponent {
  @Input({ required: true }) content = '';
  @Input() cssClass = 'text-info';
}
