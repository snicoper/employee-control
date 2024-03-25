import { Component } from '@angular/core';
import { DotComponent } from '../dot/dot.component';

@Component({
    selector: 'aw-dot-info',
    templateUrl: './dot-info.component.html',
    standalone: true,
    imports: [DotComponent]
})
export class DotInfoComponent {}
