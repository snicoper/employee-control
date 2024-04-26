import { DateTime } from 'luxon';
import { PeriodDatetime } from '../../../models/period-datetime';
import { logDebug } from '../../errors/log-messages';
import { CommonUtils } from '../../utils/common-utils';
import { DateTimeUtils } from '../../utils/datetime-utils';
import { TimeControlGroupResponse, TimeResponse } from './times-control-response.model';

/**
 * Procesa una respuesta y re-calcula los times según el timezone del usuario.
 */
export class ProcessTimeControlGroups {
  private readonly timeControlGroups: Array<TimeControlGroupResponse>;
  private readonly timeControlGroupsResult: Array<TimeControlGroupResponse> = [];
  private readonly date: DateTime;
  private readonly minutesInDay: number;

  constructor(timeControlGroups: Array<TimeControlGroupResponse>, date: DateTime) {
    this.date = date;
    this.minutesInDay = 60 * 24;
    this.timeControlGroups = this.initialAndFinishMonth(timeControlGroups);
  }

  /**
   * Comprueba todos los Array<TimeResponse> en base al timezone del usuario.
   * Genera una nueva lista de Array<TimeControlGroupResponse>.
   *
   * @returns Array<TimeControlGroupResponse>.
   */
  process(): Array<TimeControlGroupResponse> {
    this.createTimeControlGroupForCurrentMonth();
    this.timeControlGroups.forEach((timeControlGroup) => this.processTimeControlGroup(timeControlGroup));

    return this.timeControlGroupsResult;
  }

  /** Procesa cada TimeControlGroupResponse. */
  private processTimeControlGroup(timeControlGroup: TimeControlGroupResponse): void {
    this.processTimesInTimeControl(timeControlGroup.times, timeControlGroup.day);
  }

  /**
   * Comprueba el primer y último tiempo del mes siguiente y anterior al actual para mover las partes al mes actual.
   */
  private initialAndFinishMonth(timeControlGroups: Array<TimeControlGroupResponse>): Array<TimeControlGroupResponse> {
    timeControlGroups.forEach((timeControlGroup) => {
      const endOfMonth = DateTime.fromISO(timeControlGroup.dayTitle).startOf('month');
      const startOfMonth = this.date.startOf('month');

      // Último TimeControl del mes anterior al mes actual.
      if (endOfMonth < startOfMonth) {
        const lastTimeOfGroup = timeControlGroup.times[timeControlGroup.times.length - 1];
        const nextGroup = timeControlGroups.find((tcg) => tcg.day === this.date.startOf('month').day);
        nextGroup?.times.unshift(lastTimeOfGroup);

        const index = timeControlGroup.times.findIndex((t) => t.id === lastTimeOfGroup.id);
        timeControlGroup.times.splice(index, 1);
      }

      // Primer TimeControl del mes siguiente al mes actual.
      if (endOfMonth > startOfMonth) {
        const firstTimeOfGroup = timeControlGroup.times[0];
        const prevGroup = timeControlGroups.find((tcg) => tcg.day === this.date.endOf('month').day);
        prevGroup?.times.push(firstTimeOfGroup);

        const index = timeControlGroup.times.findIndex((t) => t.id === firstTimeOfGroup.id);
        timeControlGroup.times.splice(index, 1);
      }
    });

    return timeControlGroups;
  }

  /** Procesa una lista de Array<TimeResponse>. */
  private processTimesInTimeControl(times: Array<TimeResponse>, day: number): void {
    times.forEach((time) => {
      const start = DateTime.fromJSDate(new Date(time.start));
      const end = DateTime.fromJSDate(new Date(time.finish));
      const period = new PeriodDatetime(start, end);

      // Tiempo dentro del día actual.
      // |----------------| Current day.
      //     |--------| Time.
      if (period.start.day === day && period.end.day === day) {
        this.processTimeInRange(time, period, day);

        return;
      }

      // Comprobar los tiempos anteriores a las 00:00:00.
      //      |----------------| Current day.
      // |--------| Time.
      if (period.start.day !== day && period.end.day === day) {
        this.processUnderTime(time, period, day);

        return;
      }

      // Tiempos que al menos el final supera al día actual.
      // |----------------| Current day.
      //             |--------| Time.
      if (period.end.day !== day && period.start.day === day) {
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
    const currentItemControl = this.getTimeControlGroupByDay(day);

    if (!currentItemControl) {
      return;
    }

    // |-------------------| Current day.
    //    |----------| Time.
    const newTime = this.createTimeResponse(time, period.start, period.end, period.duration());

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
    const currentItemControl = this.getTimeControlGroupByDay(day);
    const diffMidnight = Math.round(period.start.endOf('day').diff(period.start, ['minutes']).minutes);
    const duration = Math.abs(Math.round(period.duration() - diffMidnight));

    // Inicio y final del día siguiente.
    // |---------------| Current day.
    //                    |--------| Time.
    if (nextTimeControl && period.start.day > day) {
      const newOverTime1 = this.createTimeResponse(time, period.start, period.end, period.duration());
      nextTimeControl.totalMinutes += period.duration();
      nextTimeControl.times.push(newOverTime1);

      return;
    }

    // Día siguiente desde las 00:00.00.
    // |---------------------| Current day.
    //                       |----| Time.
    if (nextTimeControl) {
      const newOverTime2 = this.createTimeResponse(
        time,
        period.end.startOf('day'),
        period.end.startOf('day').plus({ minutes: duration }),
        duration
      );

      nextTimeControl.totalMinutes += duration;
      nextTimeControl.times.unshift(newOverTime2);
    }

    if (!currentItemControl) {
      return;
    }

    // Día actual hasta las 23:59:59.
    // |---------------------| Current day.
    //                  |----| Time.
    const newTime = this.createTimeResponse(time, period.start, period.start.endOf('day'), diffMidnight);

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
    const currentItemControl = this.getTimeControlGroupByDay(day);
    const diffMidnight = Math.round(period.end.diff(period.end.startOf('day'), ['minutes']).minutes);
    const duration = Math.round(period.duration() - diffMidnight);

    // Comprobar si el final también es anterior el día actual.
    // Lo añade al día anterior.
    //               |---------------------| Current day.
    // |-------| Time.
    if (prevTimeControl && period.end.day < day) {
      const newUnderTime1 = this.createTimeResponse(time, period.start, period.end, period.duration());
      prevTimeControl.totalMinutes += period.duration();
      prevTimeControl.times.push(newUnderTime1);

      return;
    }

    // El inicio comienza el día anterior y el final termina el día actual.
    // Añade la parte del día anterior en el grupo del día anterior.
    // Día anterior hasta las 00:00.00.
    //            |-----------------------| Current day.
    //        |---| Time.
    if (prevTimeControl) {
      const newUnderTime = this.createTimeResponse(time, period.start, period.start.endOf('day'), duration);
      prevTimeControl.totalMinutes += duration;
      prevTimeControl.times.push(newUnderTime);
    }

    if (!currentItemControl) {
      return;
    }

    // Añade la parte del día actual.
    // Día actual desde las 00:00:00.
    //      |-----------------------| Current day.
    //      |----| Time.
    const newTime = this.createTimeResponse(time, period.start.startOf('day'), period.end, diffMidnight);
    currentItemControl.totalMinutes += diffMidnight;
    currentItemControl.times.push(newTime);
  }

  /** Crea un TimeControlGroupResponse por cada día del mes actual.  */
  private createTimeControlGroupForCurrentMonth(): void {
    const dateStart = this.date.startOf('month').startOf('day');
    const dateEnd = this.date.endOf('month').endOf('day');

    DateTimeUtils.dayDateTimeInterval(dateStart, dateEnd).forEach((currentDay) => {
      const timeControlGroupResponse = {
        day: currentDay?.day,
        dayTitle: DateTimeUtils.dateOnly(currentDay),
        totalMinutes: 0,
        times: []
      } as TimeControlGroupResponse;

      this.timeControlGroupsResult.push(timeControlGroupResponse);
    });
  }

  /** Obtener el siguiente TimeControlGroupResponse (por day) al día pasado. */
  private nextTimeControlGroup(day: number): TimeControlGroupResponse | null {
    const currentTimeControlGroup = this.getTimeControlGroupByDay(day);

    if (!currentTimeControlGroup) {
      logDebug('Error al obtener el nextTimeControlGroup.');

      return null;
    }

    const nextDay = DateTime.fromISO(currentTimeControlGroup.dayTitle)
      .set({ day: day })
      .plus({ day: 1 })
      .toFormat('yyyy-LL-dd');

    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.dayTitle === nextDay);

    return item ?? null;
  }

  /** Obtener el anterior TimeControlGroupResponse (por day) al día pasado. */
  private prevTimeControlGroup(day: number): TimeControlGroupResponse | null {
    const currentTimeControlGroup = this.getTimeControlGroupByDay(day);

    if (!currentTimeControlGroup) {
      logDebug('Error al obtener el prevTimeControlGroup.');

      return null;
    }

    const prevDay = DateTime.fromISO(currentTimeControlGroup.dayTitle)
      .set({ day: day })
      .minus({ day: 1 })
      .toFormat('yyyy-LL-dd');

    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.dayTitle === prevDay);

    return item ?? null;
  }

  /** Obtener el item actual TimeControlGroupResponse. */
  private getTimeControlGroupByDay(day: number): TimeControlGroupResponse | null {
    const item = this.timeControlGroupsResult.find((timeControl) => timeControl.day === day);

    return item ?? null;
  }

  /** Crea un nuevo TimeControl con los tiempos calculados. */
  private createTimeResponse(time: TimeResponse, start: DateTime, finish: DateTime, minutes: number): TimeResponse {
    const timeResponse = {
      id: time.id,
      start: start.toJSDate(),
      finish: finish.toJSDate(),
      incidence: time.incidence,
      timeState: time.timeState,
      closedBy: time.closedBy,
      minutes: minutes,
      dayPercent: CommonUtils.calculatePercent(this.minutesInDay, minutes)
    } as TimeResponse;

    return timeResponse;
  }
}
