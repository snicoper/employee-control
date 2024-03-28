import { DateTime } from 'luxon';
import { PeriodDatetime } from '../../models/preriod-datetime';
import { calculatePercent } from '../../utils/common-utils';
import { DatetimeUtils } from '../../utils/datetime-utils';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

/**
 * Procesa una respuesta y re-calcula los times según el
 * timezone del usuario..
 */
export class ProcessTimeControlGroups {
  private readonly timeControlGroups: TimeControlGroupResponse[];
  private readonly timeControlGroupsResult: TimeControlGroupResponse[] = [];
  private readonly date: Date;
  private readonly minutesInDay = 60 * 24;

  // TimeControlGroupResponse hora de inicio y final del día.
  private groupStartDay: DateTime;
  private groupEndDay: DateTime;

  constructor(timeControlGroups: TimeControlGroupResponse[], date: Date) {
    this.timeControlGroups = timeControlGroups;
    this.date = date;
    this.groupStartDay = DateTime.local();
    this.groupEndDay = DateTime.local();
  }

  /**
   * Comprueba todos los TimeResponse[] en base al timezone del usuario.
   * Genera una nueva lista de TimeControlGroupResponse[].
   *
   * @returns TimeControlGroupResponse[].
   */
  process(): TimeControlGroupResponse[] {
    this.createTimeControlGroupForCurrentMonth();
    this.timeControlGroups.forEach((timeControlGroup) => this.processTimeControlGroup(timeControlGroup));

    return this.timeControlGroupsResult;
  }

  /** Procesa cada TimeControlGroupResponse. */
  private processTimeControlGroup(timeControlGroup: TimeControlGroupResponse): void {
    this.groupStartDay = DateTime.fromISO(timeControlGroup.dayTitle).startOf('day');
    this.groupEndDay = this.groupStartDay.endOf('day');

    this.processTimesInTimeControl(timeControlGroup.times, timeControlGroup.day);
  }

  /** Procesa una lista de TimeResponse[]. */
  private processTimesInTimeControl(times: TimeResponse[], day: number): void {
    times.forEach((time) => {
      const start = DateTime.fromJSDate(new Date(time.start));
      const end = DateTime.fromJSDate(new Date(time.finish));
      const period = new PeriodDatetime(start, end);

      // Tiempo dentro del día actual.
      // |----------------| Current day.
      //     |--------| Time.
      if (
        period.start.day === this.groupStartDay.day &&
        period.end.day === this.groupStartDay.day &&
        period.start.day === this.groupEndDay.day &&
        period.end.day === this.groupEndDay.day
      ) {
        this.processTimeInRange(time, period, day);

        return;
      }

      // Comprobar los tiempos anteriores a las 00:00:00.
      //      |----------------| Current day.
      // |--------| Time.
      if (period.start.day < this.groupStartDay.day) {
        this.processUnderTime(time, period, day);

        return;
      }

      // Tiempos que al menos el final supera al día actual.
      // |----------------| Current day.
      //             |--------| Time.
      if (period.end.day > this.groupEndDay.day) {
        this.processOverTime(time, period, day);
      }
    });
  }

  /**
   * Caso en que el tiempo de inicio y final están dentro del día actual.
   * |----------------| Current day.
   *    |--------| Time.
   */
  private processTimeInRange(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!currentItemControl) {
      return;
    }

    // |-------------------| Current day.
    //    |----------| Time.
    const newTime = this.createTimeResponse(time, period.start.toJSDate(), period.end.toJSDate(), period.duration());

    currentItemControl.totalMinutes += period.duration();
    currentItemControl.times.push(newTime);
  }

  /**
   * Tiempos que terminan y/o empiezan pasadas las 23:59:59.
   * |---------------| Current day.
   *                    |--------| Time.
   *            |--------| Time.
   */
  private processOverTime(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const nextTimeControl = this.nextTimeControlGroup(day);
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!nextTimeControl || !currentItemControl) {
      return;
    }

    // Comprobar si el inicio también supera el día actual.
    // |---------------| Current day.
    //                    |--------| Time.
    if (period.start.day > this.groupEndDay.day) {
      const newOverTime1 = this.createTimeResponse(
        time,
        period.start.toJSDate(),
        period.end.toJSDate(),
        period.duration()
      );

      nextTimeControl.totalMinutes += period.duration();
      nextTimeControl.times.push(newOverTime1);

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día actual y el final el día siguiente.
    // |---------------------| Current day.
    //                   |--------| Time.
    const diffMidnight = Math.round(period.start.endOf('day').diff(period.start, ['minutes']).minutes);
    const duration = Math.abs(Math.round(period.duration() - diffMidnight));

    // Día siguiente desde las 00:00.00.
    const newOverTime2 = this.createTimeResponse(
      time,
      period.end.startOf('day').toJSDate(),
      period.end.startOf('day').plus({ minutes: duration }).toJSDate(),
      duration
    );

    nextTimeControl.totalMinutes += duration;
    nextTimeControl.times.unshift(newOverTime2);

    // Día actual hasta las 23:59:59.
    const newTime = this.createTimeResponse(
      time,
      period.start.toJSDate(),
      period.start.endOf('day').toJSDate(),
      diffMidnight
    );

    currentItemControl.totalMinutes += diffMidnight;
    currentItemControl.times.push(newTime);
  }

  /**
   * Comprobar si el final también supera el día actual.
   *                |---------------------| Current day.
   * |---------| Time.
   *          |---------| Time.
   */
  private processUnderTime(time: TimeResponse, period: PeriodDatetime, day: number): void {
    const prevTimeControl = this.prevTimeControlGroup(day);
    const currentItemControl = this.currentTimeControlGroup(day);

    if (!prevTimeControl || !currentItemControl) {
      return;
    }

    // Comprobar si el final también supera el día actual.
    //               |---------------------| Current day.
    // |---------| Time.
    if (period.end.day < this.groupStartDay.day) {
      const newUnderTime1 = this.createTimeResponse(
        time,
        period.start.toJSDate(),
        period.end.toJSDate(),
        period.duration()
      );

      prevTimeControl.totalMinutes += period.duration();
      prevTimeControl.times.push(newUnderTime1);

      return;
    }

    // Este caso solo puede haber uno por TimeControlGroupResponse.
    // El inicio comienza el día anterior y el final termina el día actual.
    const diffMidnight = Math.round(period.end.diff(period.end.startOf('day'), ['minutes']).minutes);
    const duration = Math.round(period.duration() - diffMidnight);

    // Día anterior hasta las 00:00.00.
    //            |-----------------------| Current day.
    //        |--------| Time.
    const newUnderTime = this.createTimeResponse(
      time,
      period.start.toJSDate(),
      period.end.endOf('day').toJSDate(),
      duration
    );

    prevTimeControl.totalMinutes += duration;
    prevTimeControl.times.push(newUnderTime);

    // Día actual desde las 00:00:00.
    //      |-----------------------| Current day.
    // |--------| Time.
    const newTime = this.createTimeResponse(
      time,
      period.start.startOf('day').toJSDate(),
      period.start.plus(duration).toJSDate(),
      diffMidnight
    );

    currentItemControl.totalMinutes += diffMidnight;
    currentItemControl.times.push(newTime);
  }

  /** Crea un TimeControlGroupResponse por cada día del mes actual.  */
  private createTimeControlGroupForCurrentMonth(): void {
    const date = DateTime.fromJSDate(this.date);
    const dateStart = date.startOf('month');
    const dateEnd = date.endOf('month');

    DatetimeUtils.dayDateTimeInterval(dateStart, dateEnd).forEach((currentDay) => {
      const instance = {
        day: currentDay?.day,
        dayTitle: currentDay?.toFormat('yyyy-LL-dd'),
        totalMinutes: 0,
        times: []
      } as TimeControlGroupResponse;

      this.timeControlGroupsResult.push(instance);
    });
  }

  /** Obtener el siguiente TimeControlGroupResponse (por day) al día pasado. */
  private nextTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const next = index + 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el anterior TimeControlGroupResponse (por day) al día pasado. */
  private prevTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const next = index - 1;
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === next);

    return item ?? null;
  }

  /** Obtener el item actual TimeControlGroupResponse. */
  private currentTimeControlGroup(index: number): TimeControlGroupResponse | null {
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === index);

    return item ?? null;
  }

  /** Crea un nuevo TimeControl con los tiempos calculados. */
  private createTimeResponse(time: TimeResponse, start: Date, finish: Date, minutes: number): TimeResponse {
    const timeResponse = {
      id: time.id,
      start: start,
      finish: finish,
      incidence: time.incidence,
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: minutes,
      dayPercent: calculatePercent(this.minutesInDay, minutes)
    } as TimeResponse;

    return timeResponse;
  }
}
