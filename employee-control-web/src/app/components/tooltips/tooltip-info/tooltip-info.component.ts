import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { TooltipDirective } from '../../../directives/tooltip.directive';

@Component({
    selector: 'aw-tooltip-info',
    templateUrl: './tooltip-info.component.html',
    standalone: true,
    imports: [TooltipDirective, NgClass]
})
export class TooltipInfoComponent {
  @Input({ required: true }) content = '';
  @Input() cssClass = 'text-info';
}
