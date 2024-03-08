import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { LayoutService } from '@aw/services/_index';

@Component({
  selector: 'aw-view-base',
  templateUrl: './view-base.component.html',
  styleUrls: ['./view-base.component.scss']
})
export class ViewBaseComponent implements OnInit {
  private readonly layoutService = inject(LayoutService);

  @Input() cssContent = 'container-fluid';
  @Input() showPageTitle = true;
  @Input() pageTitle = '';

  @Input() navbarState = true;
  @Input() sidebarState = true;
  @Input() footerState = true;

  readonly navbarState$ = computed(() => this.layoutService.navbarState$());
  readonly sidebarState$ = computed(() => this.layoutService.sidebarState$());
  readonly footerState$ = computed(() => this.layoutService.footerState$());

  ngOnInit(): void {
    this.layoutService.navbarState$.set(this.navbarState);
    this.layoutService.sidebarState$.set(this.sidebarState);
    this.layoutService.footerState$.set(this.footerState);
  }
}
