import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aw-spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
  imports: [NgClass]
})
export class SpinnerComponent implements OnInit {
  /** Solo mostrara el spinner cuando loading sea true. */
  @Input({ required: true }) loading = false;

  /** Alineación del spinner, por defecto: 'justify-content-center'. */
  @Input() justify = 'justify-content-center';

  /** Color del spinner, por defecto: 'text-primary'. */
  @Input() color = 'text-primary';

  /** Clases css extra para el spinner. */
  @Input() extraCss = '';

  /** Texto mostrado a la derecha del spinner. */
  @Input() text = '';

  /** Tamaño en px del spinner, por defecto 40px. */
  @Input() size = 40;

  style = '';

  ngOnInit(): void {
    this.style = `width: ${this.size}px; height: ${this.size}px;`;
  }
}
