import { Component } from '@angular/core';
import { CardComponent } from '../../../components/cards/card/card.component';
import { ViewBaseComponent } from '../../../components/views/view-base/view-base.component';

@Component({
    selector: 'aw-error403',
    templateUrl: './error403.component.html',
    standalone: true,
    imports: [ViewBaseComponent, CardComponent]
})
export class Error403Component {}
