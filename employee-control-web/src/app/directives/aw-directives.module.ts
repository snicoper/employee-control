import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { RequiredRoleDirective } from './required-role.directive';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [ClickStopPropagationDirective, RequiredRoleDirective, TooltipDirective],
  imports: [CommonModule],
  exports: [ClickStopPropagationDirective, RequiredRoleDirective, TooltipDirective]
})
export class AwDirectivesModule {}
