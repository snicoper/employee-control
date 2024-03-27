export interface TimeControlRecordResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  incidence: boolean;
  incidenceDescription?: string;
  start: string;
  finish: string;
  closedBy: number;
  timeState: number;
  deviceTypeStart: number;
  deviceTypeFinish: number;
  latitudeStart?: number;
  longitudeStart?: number;
  latitudeFinish?: number;
  longitudeFinish?: number;
  duration: number;
}
