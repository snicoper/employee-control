import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/* eslint-disable  @typescript-eslint/no-explicit-any */

declare let bootstrap: any;

@Directive({
  selector: '[awTooltip]',
  standalone: true
})
export class TooltipDirective implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);

  private tooltip: any;

  ngAfterViewInit(): void {
    const domElement: HTMLElement = this.elementRef.nativeElement;
    this.tooltip = new bootstrap.Tooltip(domElement);
  }

  ngOnDestroy(): void {
    this.tooltip.dispose();
  }
}
