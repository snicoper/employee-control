import { ResultResponse } from './result-response.model';

export interface ResultDataResponse<TData> extends ResultResponse {
  data: TData;
}
