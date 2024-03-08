import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AwDirectivesModule } from '@aw/directives/aw-directives.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, NgScrollbarModule, AwDirectivesModule],
  exports: [SidebarComponent]
})
export class AwSidebarModule {}
