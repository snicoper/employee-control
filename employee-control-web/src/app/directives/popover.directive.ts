import { AfterViewInit, Directive, ElementRef, OnDestroy, inject } from '@angular/core';

/* eslint-disable  @typescript-eslint/no-explicit-any */

declare let bootstrap: any;

@Directive({
  selector: '[awPopover]',
  standalone: true
})
export class PopoverDirective implements AfterViewInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private popover: any;

  ngAfterViewInit(): void {
    const domElement: HTMLElement = this.elementRef.nativeElement;
    this.popover = new bootstrap.Popover(domElement);
  }

  ngOnDestroy(): void {
    this.popover.dispose();
  }
}
