import { ApiResultItemFilter } from './api-result-item-filter';
import { ApiResultItemOrderBy } from './api-result-item-order-by';
import { LogicalOperators } from './types/logical-operator';
import { OrderTypes } from './types/order-type';
import { RelationalOperators } from './types/relational-operator';

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
  pageSize = 10;

  /** Ratio máximo de paginas. */
  ratio = 2;

  /** Items devueltos. */
  items: T[] = [];

  /** Ordenaciones. */
  orders: ApiResultItemOrderBy[] = [];

  /** Filtros. */
  filters: ApiResultItemFilter[] = [];

  constructor() {
    this.cleanFilters();
    this.cleanOrders();
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
  addFilter(propertyName: string, operator: RelationalOperators, value: string, concat = LogicalOperators.none): this {
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
    this.filters.splice(index, 1);

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
    this.filters.splice(index, 1);

    return this;
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
   * @param precedence Precedencia en la ordenación de la propiedad.
   * @returns ApiResult<T>.
   */
  addOrder(propertyName: string, orderType: OrderTypes, precedence: number): this {
    if (orderType !== OrderTypes.none) {
      const order = new ApiResultItemOrderBy(propertyName, orderType, precedence);
      this.orders.unshift(order);
    }

    return this;
  }

  /**
   * Eliminar un Order.
   *
   * @param filter Orden a eliminar.
   * @returns ApiResult<T>.
   */
  removeOrder(filter: ApiResultItemOrderBy): this {
    const index = this.orders.findIndex((item) => item.propertyName === filter.propertyName);
    this.orders.splice(index, 1);

    return this;
  }

  /** Limpiar orders. */
  cleanOrders(): void {
    this.orders = [];
  }
}
