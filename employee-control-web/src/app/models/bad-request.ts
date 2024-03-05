import { BadRequestErrors } from './bad-request-errors';

/** Respuesta de error de la API. */
export interface BadRequest {
  errors: BadRequestErrors;
  type: string;
  title: string;
  status: number;
}
