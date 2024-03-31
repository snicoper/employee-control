import { DateTime, Interval } from 'luxon';
import { WeekDays } from '../types/week-days';

export abstract class DatetimeUtils {
  /**
   * Obtener un array con un intervalo de días desde start a end con DateTime.
   *
   * @param start Fecha de inicio.
   * @param end Fecha final.
   * @returns Un array de DateTime con el intervalo de días.
   */
  static dayDateTimeInterval(start: DateTime, end: DateTime): (DateTime | null)[] {
    return Interval.fromDateTimes(start.startOf('day'), end.endOf('day'))
      .splitBy({ day: 1 })
      .map((date: Interval) => date.start);
  }

  /**
   * Obtener un array con un intervalo de días desde start a end con Date.
   *
   * @param start Fecha de inicio.
   * @param end Fecha final.
   * @returns Un array de Date con el intervalo de días.
   */
  static dayDateInterval(start: Date, end: Date): Date[] {
    const daysInterval = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      daysInterval.push(new Date(d));
    }

    return daysInterval;
  }

  /**
   * Formatear minutos a un string H:M.
   *
   * @param minutes Minutos totales a formatear.
   * @returns Tiempo H:M
   */
  static formatMinutesToTime(minutes: number): string {
    minutes = Math.floor(minutes);

    if (minutes > 60) {
      const hours = Math.floor(minutes / 60);
      const rest = Math.floor(minutes % 60);

      return `${hours}h ${rest}m`;
    }

    return `${minutes}m`;
  }

  /**
   * Obtener las fechas del año de un día concreto de la semana.
   *
   * @param year Año al que obtener el día de la semana.
   * @param weekDay Numero del día de la semana a obtener (1-7).
   * @returns Array<Date> con los fechas del día de la semana del año concreto.
   */
  static getWeekDaysFromYear(year: number, weekDay: WeekDays): Date[] {
    const result: Date[] = [];
    const start = DateTime.fromObject({ year: year, month: 1, day: 1 });
    const end = DateTime.fromObject({ year: year, month: 12, day: 31 });

    const interval = Interval.fromDateTimes(start, end);
    const subIntervals = interval.splitBy({ days: 1 });

    for (const sub of subIntervals) {
      const day = sub.start;

      if (day?.weekday === weekDay) {
        result.push(day.toJSDate());
      }
    }

    return result;
  }
}
