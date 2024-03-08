import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppEnvironments } from '@aw/core/config/_index';
import { ApiResult } from '@aw/core/features/api-result/_index';
import { Observable } from 'rxjs';

export abstract class BaseApiService {
  protected readonly http = inject(HttpClient);

  protected readonly baseUrl = AppEnvironments.baseApiUrl;

  /**
   * Obtener una lista paginada.
   *
   * @param apiResult ApiResult<TModel>.
   * @returns ApiResult<TModel>.
   */
  getPaginated<TModel>(apiResult: ApiResult<TModel>, urlPart = ''): Observable<ApiResult<TModel>> {
    const url = `${this.baseUrl}${urlPart}?${this.prepareQueryParams(apiResult)}`;

    return this.http.get<ApiResult<TModel>>(url);
  }

  /**
   * Obtener un item por su Id.
   *
   * @param urlPart Parte de la url base a concatenar.
   */
  get<TEntity>(urlPart = ''): Observable<TEntity> {
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.get<TEntity>(url);
  }

  /**
   * Crea un nuevo item de TEntity.
   *
   * @param entity Tipo entidad.
   * @param urlPart Parte de la url base a concatenar.
   * @returns TResult creado.
   */
  post<TEntity, TResult>(entity: TEntity, urlPart = ''): Observable<TResult> {
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.post<TResult>(url, entity);
  }

  /**
   * Actualiza un item de TEntity.
   *
   * @param entity Tipo entidad.
   * @param urlPart Parte de la url base a concatenar.
   * @returns TResult creado.
   */
  put<TEntity, TResult>(entity: TEntity, urlPart = ''): Observable<TResult> {
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.put<TResult>(url, entity);
  }

  /**
   * Eliminar un wn elemento.
   *
   * @param urlPart Parte de la url base a concatenar.
   */
  delete<TResult>(urlPart = ''): Observable<TResult> {
    const url = `${this.baseUrl}${urlPart}`;

    return this.http.delete<TResult>(url);
  }

  protected prepareQueryParams<TModel>(apiResult: ApiResult<TModel>): string {
    apiResult = apiResult ?? new ApiResult<TModel>();

    return this.apiResultToQueryParams(apiResult);
  }

  protected apiResultToQueryParams<TModel>(apiResult: ApiResult<TModel>): string {
    let queryParams = '';
    queryParams += `totalItems=${apiResult.totalItems}`;
    queryParams += `&pageNumber=${apiResult.pageNumber}`;
    queryParams += `&totalPages=${apiResult.totalPages}`;
    queryParams += `&pageSize=${apiResult.pageSize}`;

    if (apiResult.orders.length) {
      queryParams += this.concatQueryParam(queryParams);
      queryParams += `orders=${JSON.stringify(apiResult.orders)}`;
    }

    if (apiResult.filters.length) {
      queryParams += this.concatQueryParam(queryParams);
      queryParams += `filters=${JSON.stringify(apiResult.filters)}`;
    }

    return queryParams;
  }

  protected concatQueryParam(queryParams: string): string {
    return queryParams !== '' ? '&' : '';
  }
}
