import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ApiResult } from '@aw/core/features/api-result/_index';

@Component({
  selector: 'aw-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent<T> implements OnChanges {
  @Input({ required: true }) apiResult = new ApiResult<T>();
  @Input() itemsPageList = [10, 25, 50, 100];

  /** Mostrar itemsPageList. */
  @Input() showPageList = true;

  /** Mostrar botones de paginas. */
  @Input() showPagesButtons = true;

  @Output() changePage = new EventEmitter<void>();
  @Output() changePageListNumber = new EventEmitter<void>();

  /** Primera pagina, por defecto 1. */
  firstPage = 1;

  /** Última página. */
  lastPage = 1;

  // eslint-disable-next-line
  ngOnChanges(changes: SimpleChanges): void {
    const numMaxPages = this.apiResult.ratio * 2 + 1;
    this.firstPage = 1;
    this.lastPage = this.apiResult.totalPages > numMaxPages ? numMaxPages : this.apiResult.totalPages;

    if (this.apiResult.pageNumber > this.apiResult.ratio + 1) {
      this.firstPage = this.apiResult.pageNumber - this.apiResult.ratio;

      if (this.apiResult.totalPages > this.apiResult.pageNumber + this.apiResult.ratio) {
        this.lastPage = this.apiResult.pageNumber + this.apiResult.ratio;
      } else {
        this.lastPage = this.apiResult.totalPages;
      }
    }
  }

  /**
   * Cambiar de pagina.
   *
   * @param page Numero de pagina seleccionada.
   */
  handleChangePage(page: number): void {
    this.apiResult.pageNumber = page;
    this.changePage.emit();
  }

  /**
   * Cambiar numero de items a mostrar por pagina.
   *
   * @param num Numero de items a mostrar.
   */
  handleChangePageListNumber(num: number): void {
    this.apiResult.pageNumber = 1;
    this.apiResult.pageSize = num;
    this.changePageListNumber.emit();
  }

  /** Obtener rango de paginas desde 1 a total paginas. */
  pageRange(): number[] {
    const pages = [];

    for (let i = this.firstPage; i <= this.lastPage; i++) {
      pages.push(i);
    }

    return pages;
  }
}
