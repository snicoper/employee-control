import { Component, Input } from '@angular/core';

@Component({
  selector: 'aw-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  @Input() cssContent = 'container-fluid';
}
