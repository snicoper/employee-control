import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AwFooterModule } from '@aw/components/footer/aw-footer.module';
import { AwNavbarModule } from '@aw/components/navbar/aw-navbar.module';
import { AwSidebarModule } from '@aw/components/sidebar/aw-sidebar.module';
import { AwBreadcrumbModule } from '../breadcrumb/aw-breadcrumb.module';
import { AwCardsModule } from '../cards/aw-cards.module';
import { ViewBaseComponent } from './view-base/view-base.component';
import { ViewHeaderComponent } from './view-header/view-header.component';
import { ViewTitleComponent } from './view-title/view-title.component';

@NgModule({
  declarations: [ViewBaseComponent, ViewTitleComponent, ViewHeaderComponent],
  exports: [ViewBaseComponent, ViewHeaderComponent],
  imports: [CommonModule, AwNavbarModule, AwSidebarModule, AwFooterModule, AwBreadcrumbModule, AwCardsModule]
})
export class AwViewsModule {}
