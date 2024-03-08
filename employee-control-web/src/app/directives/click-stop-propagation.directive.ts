import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[awClickStopPropagation]' })
export class ClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    event.stopPropagation();
  }
}
