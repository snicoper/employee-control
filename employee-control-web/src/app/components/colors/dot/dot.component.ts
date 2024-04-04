import { NgClass, NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aw-dot',
  templateUrl: './dot.component.html',
  standalone: true,
  imports: [NgStyle, NgClass]
})
export class DotComponent implements OnInit {
  @Input({ required: true }) color = '';
  @Input() rounded = false;
  @Input() size = '10';

  ngOnInit(): void {
    this.size = `${this.size}px`;
  }
}
