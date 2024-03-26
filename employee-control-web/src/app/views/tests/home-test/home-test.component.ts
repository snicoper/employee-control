import { Component } from '@angular/core';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';
import { logDebug, logError, logInfo, logWarning } from '../../../core/errors/_index';

@Component({
  selector: 'aw-home-test',
  templateUrl: './home-test.component.html',
  standalone: true,
  imports: [ViewBaseComponent]
})
export class HomeTestComponent {
  handleAlertsConsole(): void {
    logError('logError');
    logWarning('logWarning');
    logInfo('logInfo');
    logDebug('logDebug');
  }
}
