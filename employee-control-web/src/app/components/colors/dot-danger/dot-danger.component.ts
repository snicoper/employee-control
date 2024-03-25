import { Component } from '@angular/core';
import { DotComponent } from '../dot/dot.component';

@Component({
    selector: 'aw-dot-danger',
    templateUrl: './dot-danger.component.html',
    standalone: true,
    imports: [DotComponent]
})
export class DotDangerComponent {}
