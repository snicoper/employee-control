import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { ApiResultItemFilter } from './api-result-item-filter';
import { ApiResultItemOrderBy } from './api-result-item-order-by';
import { LogicalOperator } from './types/logical-operator';
import { OrderType } from './types/order-type';
import { RelationalOperator } from './types/relational-operator';

export class ApiResult<T> {
  /** Comprueba si tiene pagina siguiente. */
  hasPreviousPage = false;

  /** Comprueba si tiene pagina anterior. */
  hasNextPage = false;

  /** Numero total de items. */
  totalItems = 0;

  /** Numero pagina actual. */
  pageNumber = 1;

  /** Numero total de paginas. */
  totalPages = 1;

  /** Numero de items por pagina. */
  pageSize = 25;

  /** Ratio máximo de paginas. */
  ratio = 2;

  /** Items devueltos. */
  items: Array<T> = [];

  /** Ordenación. */
  order: ApiResultItemOrderBy | string = '';

  /** Filtros. */
  filters: Array<ApiResultItemFilter> = [];

  constructor() {
    this.cleanFilters();
    this.cleanOrder();
  }

  /**
   * Clonar un ApiResult<T>.
   *
   * @param apiResult ApiResult<T> a clonar.
   * @returns ApiResult<T>.
   */
  static clone<TModel>(apiResult: ApiResult<TModel>): ApiResult<TModel> {
    return Object.assign(new ApiResult<TModel>(), apiResult);
  }

  /**
   * Añade un nuevo filtro.
   *
   * @param propertyName Nombre de la propiedad.
   * @param operator Operador lógico.
   * @param value Valor del filtro.
   * @param concat Tipo de concatenación.
   * @returns ApiResult<T>.
   */
  addFilter(propertyName: string, operator: RelationalOperator, value: string, concat = LogicalOperator.None): this {
    const filter = new ApiResultItemFilter(propertyName, operator, value, concat);
    this.filters.push(filter);

    return this;
  }

  /**
   * Elimina un filtro.
   *
   * @param filter Filtro a eliminar.
   * @returns ApiResult<T>.
   */
  removeFilter(filter: ApiResultItemFilter): this {
    const index = this.filters.findIndex((item) => item.propertyName === filter.propertyName);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }

    return this;
  }

  /**
   * Elimina un filtro por el propertyName.
   *
   * @param propertyName Nombre de la propiedad a eliminar.
   * @returns ApiResult<T>.
   */
  removeFilterByPropertyName(propertyName: string): this {
    const index = this.filters.findIndex((item) => item.propertyName === propertyName);

    if (index >= 0) {
      this.filters.splice(index, 1);
    }

    return this;
  }

  /**
   * Comprueba si hay algún filtro por el nombre de la propiedad.
   *
   * @param propertyName Nombre de la propiedad a comprobar.
   * @returns true si existe, false en caso contrario.
   */
  hasFilterByPropertyName(propertyName: string): boolean {
    const index = this.filters.findIndex((item) => item.propertyName === propertyName);

    return index >= 0;
  }

  /** Limpiar filtros. */
  cleanFilters(): void {
    this.filters = [];
  }

  /**
   * Añade un orden de una propiedad.
   *
   * @param propertyName Nombre de la propiedad.
   * @param orderType Tipo de orden.
   * @returns ApiResult<T>.
   */
  addOrder(propertyName: string, orderType: OrderType): this {
    this.order = { propertyName: propertyName, orderType: orderType } as ApiResultItemOrderBy;

    return this;
  }

  /**
   * Wrapper al cambiar de pagina con MatPaginator.
   *
   * @param pageEvent PageEvent emitido por MatPaginator.
   * @returns ApiResult<T> con pagination aplicada.
   */
  handlePageEvent(pageEvent: PageEvent): this {
    this.pageSize = pageEvent.pageSize;
    this.pageNumber = pageEvent.pageIndex + 1;

    return this;
  }

  /**
   * Wrapper para añadir el filtro de order desde una table con MatSort.
   *
   * @param sortState Resultado del filtro MatSort.
   * @returns ApiResult<T> con el filtro aplicado.
   */
  handleSortChange(sortState: Sort): this {
    const propertyName = sortState.active;

    switch (sortState.direction.toUpperCase()) {
      case OrderType.Ascending:
        this.addOrder(propertyName, OrderType.Ascending);
        break;
      case OrderType.Descending:
        this.addOrder(propertyName, OrderType.Descending);
        break;
      default:
        this.cleanOrder();
    }

    return this;
  }

  /** Limpiar order. */
  cleanOrder(): void {
    this.order = '';
  }
}
