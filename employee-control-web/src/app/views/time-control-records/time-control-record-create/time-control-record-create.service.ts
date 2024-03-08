import { Injectable, computed, signal } from '@angular/core';
import { TimeControlRecordEmployeeResponse } from './time-control-record-employee-response.model';

@Injectable()
export class TimeControlRecordCreateService {
  private readonly employeeSelected$ = signal<TimeControlRecordEmployeeResponse | null>(null);

  readonly employeeSelected = computed(() => this.employeeSelected$());

  add(employeeSelected: TimeControlRecordEmployeeResponse): void {
    this.employeeSelected$.set(employeeSelected);
  }

  clean(): void {
    this.employeeSelected$.set(null);
  }
}
