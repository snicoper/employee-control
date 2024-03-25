import { Component } from '@angular/core';
import { logDebug, logError, logInfo, logWarning } from '@aw/core/errors/_index';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

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
