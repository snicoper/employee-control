import { NgClass, NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'aw-badge',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  background = input<string>();
  color = input<string>();
  extraCss = input<string>('');
}
