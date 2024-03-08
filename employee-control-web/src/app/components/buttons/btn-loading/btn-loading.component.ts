import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BtnType } from './btn-loading.type';

@Component({
  selector: 'aw-btn-loading',
  templateUrl: './btn-loading.component.html'
})
export class BtnLoadingComponent {
  @Input({ required: true }) loading = false;
  @Input() btnClass = 'btn btn-primary';
  @Input() btnType = BtnType.submit;
  @Input() btnText = '';
  @Input() btnIcon = '';
  @Input() spinnerClass = 'spinner-border-sm';
  @Input() spinnerSize = 22;
  @Input() spinnerText = 'spinner-border-sm';
  @Input() spinnerColor = 'text-white';
  @Input() spinnerLoadingText = '';

  @Output() eventClick = new EventEmitter();

  handleClick(): void {
    this.eventClick.emit();
  }
}
