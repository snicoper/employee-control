import { NgClass, NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'aw-dot',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './dot.component.html',
  styleUrl: './dot.component.scss'
})
export class DotComponent {
  color = input<string>();
  size = input('25');

  dotSize = computed(() => `${this.size()}px`);
}
